import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET ratings with optional filtering
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const flightId = searchParams.get('flightId');
    const userId = searchParams.get('userId');
    
    // Build filter conditions
    const where: any = {};
    
    if (flightId) {
      where.flightId = flightId;
    }
    
    if (userId) {
      where.userId = userId;
    }
    
    // Get ratings with related information
    const ratings = await prisma.rating.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        flight: {
          include: {
            airline: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}

// POST to create a new rating (authenticated users only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const { 
      flightId, 
      checkIn, 
      boardingExp, 
      cabinCrew, 
      seatComfort, 
      foodQuality, 
      entertainment, 
      flightPerf, 
      valueForMoney, 
      overallRating 
    } = body;
    
    // Validate required fields
    if (!flightId || overallRating === undefined) {
      return NextResponse.json(
        { error: 'Flight ID and overall rating are required' },
        { status: 400 }
      );
    }
    
    // Check if flight exists
    const flight = await prisma.flight.findUnique({
      where: { id: flightId }
    });
    
    if (!flight) {
      return NextResponse.json(
        { error: 'Flight not found' },
        { status: 404 }
      );
    }
    
    // Check if user has already rated this flight
    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_flightId: {
          userId: session.user.id,
          flightId
        }
      }
    });
    
    let rating;
    
    if (existingRating) {
      // Update existing rating
      rating = await prisma.rating.update({
        where: {
          id: existingRating.id
        },
        data: {
          checkIn: checkIn ?? existingRating.checkIn,
          boardingExp: boardingExp ?? existingRating.boardingExp,
          cabinCrew: cabinCrew ?? existingRating.cabinCrew,
          seatComfort: seatComfort ?? existingRating.seatComfort,
          foodQuality: foodQuality ?? existingRating.foodQuality,
          entertainment: entertainment ?? existingRating.entertainment,
          flightPerf: flightPerf ?? existingRating.flightPerf,
          valueForMoney: valueForMoney ?? existingRating.valueForMoney,
          overallRating: overallRating ?? existingRating.overallRating
        },
        include: {
          flight: {
            include: {
              airline: true
            }
          }
        }
      });
    } else {
      // Create new rating
      rating = await prisma.rating.create({
        data: {
          userId: session.user.id,
          flightId,
          checkIn: checkIn ?? 0,
          boardingExp: boardingExp ?? 0,
          cabinCrew: cabinCrew ?? 0,
          seatComfort: seatComfort ?? 0,
          foodQuality: foodQuality ?? 0,
          entertainment: entertainment ?? 0,
          flightPerf: flightPerf ?? 0,
          valueForMoney: valueForMoney ?? 0,
          overallRating
        },
        include: {
          flight: {
            include: {
              airline: true
            }
          }
        }
      });
    }
    
    return NextResponse.json(rating, { status: existingRating ? 200 : 201 });
  } catch (error) {
    console.error('Error creating/updating rating:', error);
    return NextResponse.json(
      { error: 'Failed to create/update rating' },
      { status: 500 }
    );
  }
}
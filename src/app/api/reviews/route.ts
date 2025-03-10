import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET reviews with optional filtering
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
    
    // Get reviews with related information
    const reviews = await prisma.review.findMany({
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
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST to create a new review (authenticated users only)
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
    const { flightId, content } = body;
    
    // Validate required fields
    if (!flightId || !content) {
      return NextResponse.json(
        { error: 'Flight ID and review content are required' },
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
    
    // Create the review
    const review = await prisma.review.create({
      data: {
        content,
        userId: session.user.id,
        flightId
      },
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
      }
    });
    
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

// DELETE to remove a review (owner or admin only)
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get('id');
    
    if (!reviewId) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }
    
    // Find the review
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    });
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Check if user is the owner of the review or an admin
    if (review.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You are not authorized to delete this review' },
        { status: 403 }
      );
    }
    
    // Delete the review
    await prisma.review.delete({
      where: { id: reviewId }
    });
    
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
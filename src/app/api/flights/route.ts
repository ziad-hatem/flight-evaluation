import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET all flights with optional filtering
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const airline = searchParams.get("airline");
    const date = searchParams.get("date");

    // Build filter conditions
    const where: any = {};

    if (origin) {
      where.origin = {
        contains: origin,
        mode: "insensitive",
      };
    }

    if (destination) {
      where.destination = {
        contains: destination,
        mode: "insensitive",
      };
    }

    if (airline) {
      where.airline = {
        name: {
          contains: airline,
          mode: "insensitive",
        },
      };
    }

    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);

      where.departureTime = {
        gte: searchDate,
        lt: nextDay,
      };
    }

    // Get flights with airline information
    const flights = await prisma.flight.findMany({
      where,
      include: {
        airline: true,
        _count: {
          select: {
            ratings: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        departureTime: "asc",
      },
    });

    return NextResponse.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    return NextResponse.json(
      { error: "Failed to fetch flights" },
      { status: 500 }
    );
  }
}

// POST to create a new flight (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    const body = await req.json();
    const {
      flightNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      airlineId,
    } = body;

    // Validate required fields
    if (
      !flightNumber ||
      !origin ||
      !destination ||
      !departureTime ||
      !arrivalTime ||
      !airlineId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if airline exists
    const airline = await prisma.airline.findUnique({
      where: { id: airlineId },
    });

    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    // Create the flight
    const flight = await prisma.flight.create({
      data: {
        flightNumber,
        origin,
        destination,
        departureTime: new Date(departureTime),
        arrivalTime: new Date(arrivalTime),
        airlineId,
      },
      include: {
        airline: true,
      },
    });

    return NextResponse.json(flight, { status: 201 });
  } catch (error) {
    console.error("Error creating flight:", error);
    return NextResponse.json(
      { error: "Failed to create flight" },
      { status: 500 }
    );
  }
}

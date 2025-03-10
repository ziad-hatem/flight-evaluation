import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
// GET a specific flight by ID
export async function GET(req: Request, { params }: any) {
  try {
    const { id } = params;

    const flight = await prisma.flight.findUnique({
      where: { id },
      include: {
        airline: true,
        ratings: true,
        reviews: true,
      },
    });

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json(flight);
  } catch (error) {
    console.error("Error fetching flight:", error);
    return NextResponse.json(
      { error: "Failed to fetch flight" },
      { status: 500 }
    );
  }
}

// PUT to update a flight (admin only)
export async function PUT(req: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    const { id } = params;
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

    // Check if flight exists
    const existingFlight = await prisma.flight.findUnique({
      where: { id },
    });

    if (!existingFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    // Check if airline exists
    const airline = await prisma.airline.findUnique({
      where: { id: airlineId },
    });

    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    // Validate departure and arrival times
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);

    if (arrivalDate <= departureDate) {
      return NextResponse.json(
        { error: "Arrival time must be after departure time" },
        { status: 400 }
      );
    }

    // Update the flight
    const updatedFlight = await prisma.flight.update({
      where: { id },
      data: {
        flightNumber,
        origin,
        destination,
        departureTime: departureDate,
        arrivalTime: arrivalDate,
        airlineId,
      },
      include: {
        airline: true,
      },
    });

    return NextResponse.json(updatedFlight);
  } catch (error) {
    console.error("Error updating flight:", error);
    return NextResponse.json(
      { error: "Failed to update flight" },
      { status: 500 }
    );
  }
}

// DELETE a flight (admin only)
export async function DELETE(req: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check if flight exists
    const flight = await prisma.flight.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            ratings: true,
            reviews: true,
          },
        },
      },
    });

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    // Delete the flight (cascade delete will handle related ratings and reviews)
    await prisma.flight.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting flight:", error);
    return NextResponse.json(
      { error: "Failed to delete flight" },
      { status: 500 }
    );
  }
}

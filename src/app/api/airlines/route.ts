import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET all airlines
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    // Build filter conditions
    const where: any = {};

    if (name) {
      where.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    // Get airlines with flight count
    const airlines = await prisma.airline.findMany({
      where,
      include: {
        _count: {
          select: {
            flights: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(airlines);
  } catch (error) {
    console.error("Error fetching airlines:", error);
    return NextResponse.json(
      { error: "Failed to fetch airlines" },
      { status: 500 }
    );
  }
}

// POST to create a new airline (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    // if (session?.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await req.json();
    const { name, logo, description } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: "Airline name is required" },
        { status: 400 }
      );
    }

    // Check if airline already exists
    const existingAirline = await prisma.airline.findUnique({
      where: { name },
    });

    if (existingAirline) {
      return NextResponse.json(
        { error: "Airline with this name already exists" },
        { status: 409 }
      );
    }

    // Create the airline
    const airline = await prisma.airline.create({
      data: {
        name,
        logo,
        description,
      },
    });

    return NextResponse.json(airline, { status: 201 });
  } catch (error) {
    console.error("Error creating airline:", error);
    return NextResponse.json(
      { error: "Failed to create airline" },
      { status: 500 }
    );
  }
}

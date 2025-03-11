// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
// GET a specific airline by ID
export async function GET(
  request: NextRequest,
  { params }: any
): Promise<NextResponse> {
  try {
    const airline = await prisma.airline.findUnique({
      where: { id: params.id },
      include: {
        flights: true,
        _count: {
          select: { flights: true },
        },
      },
    });

    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    return NextResponse.json(airline);
  } catch (error) {
    console.error("Error fetching airline:", error);
    return NextResponse.json(
      { error: "Failed to fetch airline" },
      { status: 500 }
    );
  }
}

// PUT to update an airline (admin only)
export async function PUT(
  request: NextRequest,
  { params }: any
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;
    const body = await request.json();
    const { name, logo, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Airline name is required" },
        { status: 400 }
      );
    }

    const existingAirline = await prisma.airline.findUnique({
      where: { id },
    });

    if (!existingAirline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    const duplicateAirline = await prisma.airline.findFirst({
      where: {
        name,
        id: { not: id },
      },
    });

    if (duplicateAirline) {
      return NextResponse.json(
        { error: "Another airline with this name already exists" },
        { status: 409 }
      );
    }

    const updatedAirline = await prisma.airline.update({
      where: { id },
      data: { name, logo, description },
    });

    return NextResponse.json(updatedAirline);
  } catch (error) {
    console.error("Error updating airline:", error);
    return NextResponse.json(
      { error: "Failed to update airline" },
      { status: 500 }
    );
  }
}

// DELETE an airline (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: any
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const airline = await prisma.airline.findUnique({
      where: { id },
      include: {
        _count: {
          select: { flights: true },
        },
      },
    });

    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    if (airline._count.flights > 0) {
      return NextResponse.json(
        { error: "Cannot delete airline with associated flights" },
        { status: 400 }
      );
    }

    await prisma.airline.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting airline:", error);
    return NextResponse.json(
      { error: "Failed to delete airline" },
      { status: 500 }
    );
  }
}

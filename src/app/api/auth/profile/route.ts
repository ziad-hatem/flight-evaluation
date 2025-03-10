import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";

// GET user profile (authenticated users only)
export async function GET(req: Request) {
  try {
    // Get the session with explicit cookie handling
    const cookieStore = cookies();
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user?.id) {
      console.log("Session validation failed:", {
        sessionExists: !!session,
        userIdExists: !!session?.user?.id,
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

// PUT to update user profile (authenticated users only)
export async function PUT(req: Request) {
  try {
    // Get the session with explicit cookie handling
    const cookieStore = cookies();
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user?.id) {
      console.log("Session validation failed on update:", {
        sessionExists: !!session,
        userIdExists: !!session?.user?.id,
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, currentPassword, newPassword } = body;

    // Get current user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {};

    // Update name if provided
    if (name) {
      updateData.name = name;
    }

    // Update email if provided and different from current
    if (email && email !== user.email) {
      // Check if email is already in use
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }

      updateData.email = email;
    }

    // Update password if provided
    if (newPassword && currentPassword) {
      // Verify current password
      if (!user.password) {
        return NextResponse.json(
          { error: "Cannot update password for this account type" },
          { status: 400 }
        );
      }

      const isPasswordValid = await compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }

      // Hash new password
      updateData.password = await hash(newPassword, 10);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}

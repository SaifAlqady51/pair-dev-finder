import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, Users } from "@/db/schema";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const values: Omit<Users, "emailVerified" | "image" | "id"> =
      await request.json();

    // Check if the user already exists in the database
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(
      values.password!,
      parseInt(process.env.SALT_ROUNDS!),
    );

    // Insert the new user into the database
    await db.insert(users).values({ ...values, password: encryptedPassword });

    return NextResponse.json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
}

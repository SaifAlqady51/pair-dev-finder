"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { LoginUserType } from "@/schemas";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Test the DB connection
    const dbConnectionSuccessful = await testDbConnection();
    if (!dbConnectionSuccessful) {
      return NextResponse.json(
        { success: false, message: "Login failed, try again later" },
        { status: 500 },
      );
    }
    const { email, password }: LoginUserType = await request.json();

    // Check if the user exists
    const checkIfUserExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (checkIfUserExist.length !== 1) {
      return NextResponse.json(
        { success: false, message: "Email does not exist" },
        { status: 400 },
      );
    }

    // Check if user has a password
    if (!checkIfUserExist[0].password) {
      return NextResponse.json(
        {
          success: false,
          message: "Looks like you've registered with Google or GitHub",
        },
        { status: 400 },
      );
    }

    // Check if password is correct
    const checkPassword = await bcrypt.compare(
      password,
      checkIfUserExist[0].password!,
    );
    if (!checkPassword) {
      return NextResponse.json(
        { success: false, message: "Wrong password" },
        { status: 400 },
      );
    }

    // Return success response
    return NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
async function testDbConnection() {
  try {
    await db.execute("SELECT 1"); // Simple DB test query
    return true;
  } catch {
    return false;
  }
}

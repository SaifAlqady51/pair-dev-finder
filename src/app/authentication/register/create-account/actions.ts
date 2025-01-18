"use server";
import { db } from "@/db";
import { users, Users } from "@/db/schema";
import { FormResponseType } from "@/types/formResponse";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function createUserAccount({
  ...values
}: Omit<Users, "emailVerified" | "image" | "id">): Promise<FormResponseType> {
  try {
    // Check if the user already exists in the database
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, values.email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        message: "A user with this email already exists.",
      };
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(
      values.password!,
      parseInt(process.env.SALT_ROUNDS!),
    );

    // Insert the new user into the database
    await db.insert(users).values({ ...values, password: encryptedPassword });

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

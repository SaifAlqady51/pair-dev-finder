"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { FormResponseType } from "@/types/formResponse";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

type checkLoginUserType = {
  email: string;
  password: string;
};

export async function checkLoginUser({
  email,
  password,
}: checkLoginUserType): Promise<FormResponseType> {
  try {
    const checkIfUserExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // check if user exists
    if (checkIfUserExist.length !== 1) {
      return { success: false, message: "Email does not exist" };
    }

    // check if user has a password
    if (!checkIfUserExist[0].password) {
      return {
        success: false,
        message: "Looks like you've registered with Google or GitHub",
      };
    }

    // check if password is correct
    const checkPassword = await bcrypt.compare(
      password,
      checkIfUserExist[0].password!,
    );
    if (!checkPassword) {
      return { success: false, message: "Wrong password" };
    }

    // If everything is successful
    return { success: true, message: "Login successful" };
  } catch (error) {
    // If an unexpected error occurs
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

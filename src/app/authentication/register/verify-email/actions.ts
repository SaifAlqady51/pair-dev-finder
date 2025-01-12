"use server";
import * as nodemailer from "nodemailer";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

type CheckEmailType = {
  email: string;
  template: any;
};

export async function verifyEmail({
  email,
  template,
}: CheckEmailType): Promise<{ success: boolean; message: string }> {
  try {
    const checkIfUserExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (checkIfUserExist.length > 0) {
      return { success: false, message: "Email address already in use." };
    }

    await transporter.sendMail({
      from: email,
      to: email,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: template,
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error during email verification:", error);
    return {
      success: false,
      message: `Unable to send verification email. Please try again later.`,
    };
  }
}

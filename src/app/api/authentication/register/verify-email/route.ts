import { NextResponse } from "next/server";
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
  template: string;
};

export async function POST(request: Request) {
  try {
    const { email, template }: CheckEmailType = await request.json();

    // Check if the email already exists in the database
    const checkIfUserExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (checkIfUserExist.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email address already in use." },
        { status: 400 },
      );
    }

    // Send the verification email
    await transporter.sendMail({
      from: email,
      to: email,
      replyTo: email,
      subject: `Verification Code for Pair Dev Finder`,
      html: template,
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to send verification email. Please try again later.",
      },
      { status: 500 },
    );
  }
}

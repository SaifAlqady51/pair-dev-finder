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
  code?: string;
};

export async function checkEmail({ email, template, code }: CheckEmailType) {
  try {
    const checkIfUserExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (checkIfUserExist[0]) {
      throw new Error("Email address used before");
    } else {
      await transporter.sendMail({
        from: email,
        to: email,
        replyTo: email,
        subject: `Website activity from ${email}`,
        html: template,
      });
    }
  } catch (error) {
    throw new Error(`unable to send email : ${error} `);
  }
}

"use server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { rooms } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { checkGithubRepo } from "@/utils";

export async function GET() {
  try {
    const fetchedRooms = await db
      .select()
      .from(rooms)
      .orderBy(desc(rooms.created_at))
      .limit(9);
    return NextResponse.json({ success: true, data: fetchedRooms });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching rooms." + error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const data = await req.json();

    const session = await getSession();
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You have to sign in first",
      });
    }

    if (data.githubRepo) {
      const validGithubRepo = await checkGithubRepo(data.githubRepo);

      if (!validGithubRepo) {
        return NextResponse.json({
          success: false,
          message: "Invalid GitHub repo",
        });
      }
    }

    const insertedRoom = await db
      .insert(rooms)
      .values({ ...data, userId: session.user.id })
      .returning();
    return NextResponse.json({ success: true, data: insertedRoom });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating room." + error },
      { status: 500 },
    );
  }
}

"use server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { rooms } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { checkGithubRepo } from "@/utils";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const limitParam = url.searchParams.get("limit");

    const totalRooms = await db
      .select({ count: sql<number>`count(*)`.as("count") })
      .from(rooms);

    let roomsData;

    if (!pageParam && !limitParam) {
      roomsData = await db.select().from(rooms).orderBy(desc(rooms.created_at));
    } else {
      const page = Number(pageParam) || 1;
      const limit = Number(limitParam) || 9;
      const offset = (page - 1) * limit;

      roomsData = await db
        .select()
        .from(rooms)
        .orderBy(desc(rooms.created_at))
        .limit(limit)
        .offset(offset);
    }

    console.log({
      success: true,
      data: roomsData,
      totalCount: totalRooms[0].count,
    });

    return NextResponse.json({
      success: true,
      data: roomsData,
      totalCount: totalRooms[0].count,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching rooms.",
        error: error instanceof Error ? error.message : String(error),
      },
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

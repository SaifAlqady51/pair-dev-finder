"use server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { rooms } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const fetchedRooms = await db
      .select()
      .from(rooms)
      .orderBy(desc(rooms.created_at))
      .limit(9);
    revalidatePath("/");
    return NextResponse.json({ success: true, data: fetchedRooms });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching rooms." + error },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const session = await getSession();
    if (!session) {
      throw new Error("You have to sign in first");
    }

    const insertedRoom = await db
      .insert(rooms)
      .values({ ...data, userId: session.user.id })
      .returning();

    revalidatePath("/");
    return NextResponse.json({ success: true, data: insertedRoom });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating room." + error },
      { status: 500 },
    );
  }
}

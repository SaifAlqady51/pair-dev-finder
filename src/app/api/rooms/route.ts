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
    console.log(data);

    const session = await getSession();
    if (!session) {
      throw new Error("You have to sign in first");
    }
    console.log("USERID  " + session.user.id);

    const insertedRoom = await db
      .insert(rooms)
      .values({ ...data, userId: session.user.id });

    revalidatePath("/");
    console.log("INsertedRoom  " + insertedRoom);
    return NextResponse.json({ success: true, data: insertedRoom });
  } catch (error) {
    console.log("Errorrrrrrrrrrrrrrrrrrrrrrrr");
    return NextResponse.json(
      { success: false, message: "Error creating room." + error },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { rooms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const roomId = params.id;
    const [fetchedRoom] = await db
      .select()
      .from(rooms)
      .where(eq(rooms.id, roomId))
      .limit(1);

    if (!fetchedRoom) {
      return NextResponse.json(
        { success: false, message: "Room not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: fetchedRoom });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching room." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const roomId = params.id;
    await db.delete(rooms).where(eq(rooms.id, roomId));
    return NextResponse.json({ success: true, message: "Room deleted." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting room." },
      { status: 500 },
    );
  }
}

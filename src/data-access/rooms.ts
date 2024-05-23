import { db } from "@/db";
import { rooms } from "@/db/schema";
import { unstable_noStore } from "next/cache";
import { desc } from 'drizzle-orm';

export async function getRooms(){
    unstable_noStore()
    const invokedRooms = await db.select().from(rooms).orderBy(desc(rooms.created_at)).limit(9)

    return invokedRooms
}
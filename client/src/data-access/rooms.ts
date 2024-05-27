import { db } from "@/db";
import { rooms } from "@/db/schema";
import { unstable_noStore } from "next/cache";
import { desc, eq } from 'drizzle-orm';

export async function getRooms(){
    unstable_noStore()
    const invokedRooms = await db.select().from(rooms).orderBy(desc(rooms.created_at)).limit(9)
    return invokedRooms
}

export async function getRoom(roomId:string){
    unstable_noStore()
    const invokedRooms = await db.query.rooms.findFirst({
        where:eq(rooms.id,roomId)
    })
    return invokedRooms
}
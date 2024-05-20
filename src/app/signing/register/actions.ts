"use server"
import { db } from "@/db"
import { users,Users } from "@/db/schema"
import * as bcrypt from "bcrypt"

export async function createUserAccount({...values}: Omit<Users,"emailVerified" | "image" | "id">){

    try{
        const encryptedPassword = await bcrypt.hash(values?.password!,parseInt(process.env.SALT_ROUNDS!))
        await db.insert(users).values({...values,password:encryptedPassword})
    }catch(error){
        throw new Error(`${error}`)
        
    }


}
"use server"
import { db } from "@/db"
import { users } from "@/db/schema"
import * as bcrypt from "bcrypt"

interface CreateUserRequestType  {
    name:string
    email:string,
    password:string,
}

export async function createUserAccount({...values}: CreateUserRequestType){

    const encryptedPassword = await bcrypt.hash(values.password,parseInt(process.env.SALT_ROUNDS!))

    await db.insert(users).values({...values,password:encryptedPassword})

}
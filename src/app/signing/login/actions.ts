"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import * as bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { check } from "drizzle-orm/mysql-core"

type checkLoginUserType = {
    email:string,
    password:string
}

export async function checkLoginUser({email,password}:checkLoginUserType){
    try{
        const checkIfUserExist = await db.select().from(users).where(eq(users.email,email)).limit(1)
        // check if user exists
        if (checkIfUserExist.length !== 1) {
            throw new Error(`Email does not exist`);
        }
        // check if user has a password
        if (!checkIfUserExist[0].password) {
            throw new Error("Looks like you've registered with google or github");
        }
        // check if password is correct
        const checkPassword = await bcrypt.compare(password, checkIfUserExist[0].password!)
        if (!checkPassword) {
            throw new Error("Wrong pssword")
        }

    }
    catch(error){
        throw new Error(`${error}`)
    }
}
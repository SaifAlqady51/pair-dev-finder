import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {DrizzleAdapter} from '@auth/drizzle-adapter'
import type {Adapter} from "next-auth/adapters"
import { db } from "@/db"

const handler = NextAuth({
    adapter:DrizzleAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ]

})

export { handler as GET, handler as POST }


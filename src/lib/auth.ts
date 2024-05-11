import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"


export const authConfig = {

    adapter:DrizzleAdapter(db) as Adapter,
    session:{
        strategy:'jwt'
    },
    providers: [
        GithubProvider({
          clientId:process.env.GITHUB_CLIENT_ID!,
          clientSecret:process.env.GITHUB_CLIENT_SECRET!
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, token.email!),
          });
    
          if (!dbUser) {
            throw new Error("no user with email found");
          }
    
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
          };
        },
        async session({ token, session }) {
          if (token) {
            session.user = {
              id: token.id as string,
              name: token.name,
              email: token.email,
              image: token.picture,
            };
          }
    
          return session;
        },
      },

} satisfies AuthOptions;


export function getSession(){
    return getServerSession(authConfig)
}
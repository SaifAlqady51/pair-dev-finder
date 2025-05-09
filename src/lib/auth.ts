import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const checkIfUserExist = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email!))
          .limit(1);
        return checkIfUserExist[0];
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
    redirect() {
      return "/";
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;

export function getSession() {
  return getServerSession(authConfig);
}

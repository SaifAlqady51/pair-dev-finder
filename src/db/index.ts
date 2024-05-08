import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";
import * as schema from "./schema";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(pool);

export { db };

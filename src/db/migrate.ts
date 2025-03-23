import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(sql);

async function migrateDatabase() {
  try {
    console.log("Starting migration...");

    // Check if public schema exists before dropping
    const [{ exists }] = await sql<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT 1 FROM pg_namespace WHERE nspname = 'public'
      );
    `;

    if (exists) {
      await sql`DROP SCHEMA public CASCADE;`;
      console.log("Existing public schema dropped.");
    }

    // Create public schema if it doesn't exist
    await sql`CREATE SCHEMA IF NOT EXISTS public;`;
    console.log("Schema ensured.");

    // Run migrations
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await sql.end(); // Ensure connection is closed
  }
}

migrateDatabase();

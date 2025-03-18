import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { max: 1 }); // Ensure a single connection
const db = drizzle(sql);

async function main() {
  console.log("Migration starts...");

  // Reset schema
  await sql`DROP SCHEMA public CASCADE;`;
  console.log("Database schema reset.");

  // Run migrations
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migration ends.");

  process.exit();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import fs from "fs";
import path from "path";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { max: 5 }); // Increase pool size
const db = drizzle(sql);

async function hasPendingMigrations(): Promise<boolean> {
  // Read migration files from the migration folder
  const migrationFolder = path.resolve("./drizzle");
  const migrationFiles = fs
    .readdirSync(migrationFolder)
    .filter((file) => file.endsWith(".sql"))
    .map((file) => file.replace(".sql", "")); // Extract migration names

  // Get already applied migrations from the database
  const appliedMigrations = await sql<{ name: string }[]>`
    SELECT name FROM _drizzle_migrations
  `;

  const appliedMigrationNames = new Set(appliedMigrations.map((m) => m.name));

  // Check if there are any new migrations
  return migrationFiles.some((file) => !appliedMigrationNames.has(file));
}

async function migrateDatabase() {
  try {
    console.log("Checking for pending migrations...");

    if (!(await hasPendingMigrations())) {
      console.log("No pending migrations. Skipping migration process.");
      return;
    }

    console.log("Starting migration...");

    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await sql.end(); // Close DB connection
  }
}

migrateDatabase();

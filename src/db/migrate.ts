import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

async function main() {
  console.log("migration starts");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("migration ends");
  process.exit();
}

main().catch((err) => {
  console.log(err);
  process.exit();
});

import { migrate } from "drizzle-orm/node-postgres/migrator";
import {db} from './index'
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

async function main(){

    console.log("migration starts")
    await migrate(db ,{migrationsFolder:"drizzle"})
    console.log("migration ends")
    process.exit()
}

main().catch(err => {
    console.log(err);
    process.exit()
})

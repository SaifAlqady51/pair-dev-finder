import { migrate } from "drizzle-orm/node-postgres/migrator";
import {db} from './index'

migrate(db,{migrationsFolder:"drizzle"})
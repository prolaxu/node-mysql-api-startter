import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dbConfig from '../config/database'

const poolConnection = mysql.createPool(dbConfig);
const db = drizzle(poolConnection);
export default db;
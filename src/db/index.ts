import { Pool } from "pg";
import config from "../config/env";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
        
CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
name VARCHAR(40),
email VARCHAR(40) UNIQUE NOT NULL,
password VARCHAR(40) NOT NULL,
is_active BOOLEAN DEFAULT true,
age INT,

created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()

) `);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
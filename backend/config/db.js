import mysql from "mysql2";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "VVcc@4591",
  database: "school_db"
});

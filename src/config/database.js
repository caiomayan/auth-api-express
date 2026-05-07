import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("connect", () => {
  console.log(
    `${process.env.DB_NAME} (PostgreSQL Database) received transaction successfully`,
  );
});

pool.on("error", (e) => {
  console.error("Connection error: ", e);
  process.exit(-1);
});

export default pool;

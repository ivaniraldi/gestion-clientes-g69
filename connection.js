const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "iraldi11",
  database: "gestion_clientes",
  port: 5433,
  allowExitOnIdle: true,
});

module.exports = { pool };
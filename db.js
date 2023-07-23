const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: "BuchokoyPostgresql.1990",
    port: 5432,
});

module.exports = pool;
const Pool = require("pg").Pool;

const pool = new Pool(
    {
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.DATABASE,
    }
);
module.exports = pool;
export {}
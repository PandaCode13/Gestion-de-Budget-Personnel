const { Pool } = require("pg");

const pool = new Pool (
    {
        host : process.env.PG_HOST,
        port : process.env.PG_PORT,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
    }
);

module.exports = async () => {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL connecté");
    } catch (error) {
        console.error("Erreur de connexion PostgreSQL: ", error);
        process.exit(1);
    }
};

module.exports.pool = pool;

console.log("PostgreSQL Host: ", process.env.PG_HOST);
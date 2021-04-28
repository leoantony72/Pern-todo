const   Pool = require("pg").Pool;

const pool = new Pool ({
    user: "leoantony",
    password: "karwizard",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})
module.exports = pool; 
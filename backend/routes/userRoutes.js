const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10
});

router.get("/usuarios", (req, res) => {
    pool.query('SELECT u.nombre, u.genero, c.nombre FROM estudiante u JOIN carrera c ON u.id_carrera = c.id', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

module.exports = router;
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

router.get("/intereses", (req, res) => {
    pool.query('SELECT nombre, topico FROM interes;', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
})

//interes-ramo
router.get("/intereses/:id", (req, res) => {
    pool.query('SELECT i.nombre, i.topico FROM interes i JOIN asignatura_interes r ON r.id_interes = i.id AND r.id_asignatura = ?;', req.params.id, (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
})

module.exports = router;
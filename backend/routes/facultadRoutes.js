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

//Todas las facultades
router.get("/facultades",  (req, res) => {
    pool.query('SELECT f.nombre z.nombre FROM facultad f JOIN zona z ON f.id_zona = z.id;', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Facultad por id
router.get("/facultades/:id",  (req, res) => {
    pool.query('SELECT f.nombre z.nombre nombreZona FROM facultad f JOIN zona z ON f.id_zona = z.id WHERE f.id = ?;', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Facultades por zona
router.get("/facultades/zona/:zonaId", (req, res) => {
    pool.query(`
        SELECT
            f.nombre,
            z.nombre AS nombreZona
        FROM facultad f
        JOIN zona z ON f.id_zona = z.id
        WHERE z.id = ?
        `, [req.params.zonaId],
        (error, results) => {
            if (error) {
                return res.status(500).send(error.message);
            }
            res.json(results);
        });
});

module.exports = router;
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

router.get("/carreras",  (req, res) => {
    pool.query('SELECT c.nombre nombre, f.nombre facultad, c.modalidad modalidad FROM carrera c JOIN facultad f ON c.id_facultad=f.id;', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

router.get("/carreras/:id", (req, res) => {
    pool.query(`
        SELECT c.nombre nombre, f.nombre facultad, c.modalidad modalidad
        FROM carrera c JOIN facultad f ON c.id_facultad=f.id
        WHERE c.id = ?
        `, req.params.id,
        (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

router.get("/carreras/zona/:zonaId", (req, res) => {
    pool.query(`
        SELECT
            c.id AS carrera_id,
            c.nombre AS carrera_nombre,
            c.modalidad,
            f.nombre AS facultad_nombre,
            z.nombre AS zona_nombre
        FROM carrera c
        JOIN facultad f ON c.id_facultad = f.id
        JOIN zona z ON f.id_zona = z.id
        WHERE z.id = ?
        `, req.params.zonaId,
        (error, results) => {
            if (error) {
                return res.status(500).send(error.message);
            }
            res.json(results);
        });
});

module.exports = router;
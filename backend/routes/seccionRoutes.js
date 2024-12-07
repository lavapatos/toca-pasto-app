const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");
const {json} = require("express");

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

router.use(express.json());

//Secciones de un ramo
router.get("/asignatura/:id/secciones", (req, res) => {
    pool.query('SELECT numero, profesor, sala FROM seccion WHERE id_asignatura = ?;', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Bloques de una seccion
router.get("/seccion/:id", (req, res) => {
    pool.query('SELECT b.dia, b.hora_inicio, b.hora_fin FROM bloque JOIN seccion_bloque sBl ON sBl.id_seccion = ?;', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

module.exports = router;
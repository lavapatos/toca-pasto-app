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

router.use(express.json());

//Todos los intereses
router.get("/intereses", (req, res) => {
    pool.query('SELECT nombre, topico FROM interes;', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Intereses de un ramo
router.get("/intereses/:id", (req, res) => {
    pool.query('SELECT i.nombre, i.topico FROM interes i JOIN asignatura_interes r ON r.id_interes = i.id WHERE r.id_asignatura = ?;', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Intereses de un topico
router.get("/intereses/topico", (req, res) => {
    pool.query('SELECT nombre, topico FROM interes i WHERE topico = ?', [req.body.topico], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Intereses de un usuario
router.get("/intereses/:userId", (req, res) => {
    pool.query('SELECT nombre, topico FROM interes i JOIN estudiante_interes eIn ON eIn.id_interes = i.id WHERE eIn.id_estudiante = ?', [req.params.userId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

module.exports = router;
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

//Todas las asignaturas
router.get("/asignaturas", (req, res) => {
    pool.query('SELECT nombre, departamento, semestre, es_cfg FROM asignatura;', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Asignaturas de una carrera
router.get("/asignaturas/carrera/:carId", (req, res) => {
    pool.query(`
        SELECT a.nombre, a.departamento, a.semestre, a.es_cfg
        FROM asignatura a
        JOIN carrera_asignatura cAs ON cAs.id_asignatura = a.id
        JOIN carrera c ON c.id = cAs.id_carrera
        WHERE c.id = ?;`, req.params.carId, (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Asignaturas con un interés
router.get("/asignaturas/interes/:inId", (req, res) => {
    pool.query(`
        SELECT a.nombre, a.departamento, a.semestre, a.es_cfg
        FROM asignatura a
        JOIN asignatura_interes aIn ON aIn.id_asignatura = a.id
        WHERE aIn.id = ?;`, req.params.inId, (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Asignaturas de un departamento
router.get("/asignaturas/dep", (req, res) => {
    pool.query(`
        SELECT a.nombre, a.departamento, a.semestre, a.es_cfg
        FROM asignatura a
        WHERE a.departamento = ?;`, req.body.departamento, (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

module.exports = router;
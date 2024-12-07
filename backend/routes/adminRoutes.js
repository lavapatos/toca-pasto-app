const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");
const authMiddleware = require('../middleware/authMiddleware.js');
const cookieParser = require("cookie-parser");

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
router.use(cookieParser());

//Todos los usuarios
router.get("/usuarios", authMiddleware.authenticateUser, authMiddleware.isAdmin, (req, res) => {
    pool.query('SELECT u.nombre, u.genero, c.nombre FROM estudiante u JOIN carrera c ON u.id_carrera = c.id;', (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Agregar carrera
router.post("/admin/crearCarrera", authMiddleware.authenticateUser, authMiddleware.isAdmin, (req, res) => {
    pool.query('INSERT INTO carrera (nombre, modalidad, id_facultad) VALUES (?, ?, ?);', [req.body.nombre, req.body.modalidad, req.body.facId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.status(200).send('Carrera creada')
    });
});

//Eliminar carrera
router.delete("/admin/eliminarCarrera/:id", authMiddleware.authenticateUser, authMiddleware.isAdmin, (req, res) => {
    pool.query('DELETE FROM carrera WHERE id = ?;', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.status(200).send('Carrera eliminada')
    });
});

//Agregar facultad
router.post("/admin/crearFacu", authMiddleware.authenticateUser, authMiddleware.isAdmin, (req, res) => {
    pool.query('INSERT INTO facultad (nombre, id_zona) VALUES (?, ?);', [req.body.nombre, req.body.zonaId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.status(200).send('Facultad creada')
    });
});

//Eliminar facultad
router.delete("/admin/eliminarFacu/:id", authMiddleware.authenticateUser, authMiddleware.isAdmin, (req, res) => {
    pool.query('DELETE FROM facultad WHERE id = ?;', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.status(200).send('Facultad eliminada')
    });
});

module.exports = router;
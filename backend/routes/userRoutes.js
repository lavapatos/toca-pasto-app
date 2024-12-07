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

router.use(cookieParser());
router.use(express.json());

router.get("/perfil", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`
        SELECT u.nombre, u.genero, c.nombre, u.fecha_nacimiento, u.correo
        FROM estudiante u 
        JOIN carrera c
        ON u.id_carrera = c.id
        WHERE u.id = ?
        `, userId, (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

router.post("/modifyPerfil", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;

    pool.query('SELECT id FROM carrera WHERE nombre = ?', [req.body.carrera], (error, results) => {
        if (error) {
            return res.status(500).send({ error: 'Error.', details: error.message });
        }
        if (results.length === 0) {
            return res.status(404).send({ error: 'Carrera no existente.' });
        }
        const carreraId = results[0].id;
        pool.query(`
            UPDATE estudiante
            SET
                rut = ?,
                fecha_nacimiento = DATE(?),
                genero = ?,
                id_carrera = ?
            WHERE id = ?;
        `, [req.body.rut, req.body.fecha, req.body.genero, carreraId, userId], (error, results) => {
            if (error) {
                return res.status(500).send({ error: 'No se pudo actualizar el perfil.', details: error.message });
            }
            res.json({ message: 'Perfil actualizado.', results });
        });
    });
});

module.exports = router;
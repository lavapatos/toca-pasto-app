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

//Datos del perfil
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

//Modificar perfil
router.post("/modifyPerfil", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query('SELECT id FROM carrera WHERE nombre = ?', [req.body.carrera], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        if (results.length === 0) {
            return res.status(404).send(error.message);
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
                return res.status(500).send(error.message);
            }
        });
    });
});

//Intereses del perfil
router.get("/perfil/intereses", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`SELECT nombre, topico FROM interes i JOIN estudiante_interes eIn ON eIn.id_interes = i.id WHERE eIn.id_estudiante = ?`, [userId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Agregar interes
router.post("/perfil/intereses/:inId", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`
        INSERT INTO estudiante_interes (id_estudiante, id_interes)
        VALUES (?, ?);
    `, [userId, req.params.inId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
    });
});


//Eliminar interes
router.delete("/perfil/intereses/:inId", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`
        DELETE FROM estudiante_interes
        WHERE id_estudiante = ?
        AND id_interes = ?;
    `, [userId, req.params.inId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
    });
});

//Secciones del perfil
router.get("/perfil/secciones", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`
        SELECT s.numero, a.nombre
        FROM secciones s
        JOIN estudiante_seccion eSe ON s.id = eSe.id_seccion
        JOIN asignatura a ON a.id = s.id_asignatura
        WHERE eSe.id_estudiante = ?;
    `, [userId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

//Agregar seccion
router.post("/perfil/seccion/:seId", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`
        INSERT INTO estudiante_seccion (id_estudiante, id_seccion)
        VALUES (?, ?);
    `, [userId, req.params.seId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
    });
});

//Eliminar interes
router.delete("/perfil/seccion/:seId", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`
        DELETE FROM estudiante_seccion
        WHERE id_estudiante = ?
        AND id_seccion = ?;
    `, [userId, req.params.seId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
    });
});

//Crear matches posibles
router.post("/matches/usuario", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    //Documentado en carpeta /scriptsMySQL-ejemplo
    pool.query('CALL crearMatches(?)', [userId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
    });
});

//Crear ventanas posibles
router.post("/ventanas/usuario", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    //Documentado en carpeta /scriptsMySQL-ejemplo
    pool.query('CALL crearVentanas(?)', [userId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
    });
});

//Matches del usuario
router.get("/matches/usuario", authMiddleware.authenticateUser, (req, res) => {
    const userId = req.userId;
    pool.query(`
        SELECT 
            e2.nombre,
            eMa.tipo_match
        FROM estudiante_match eMa
        JOIN estudiante e2
        ON eMa.id_estudiante2 = e2.id
        WHERE eMa.id_estudiante1 = ?
        UNION
        SELECT 
            e1.nombre,
            eMa.tipo_match
        FROM estudiante_match eMa
        JOIN estudiante e1
        ON eMa.id_estudiante1 = e1.id
        WHERE eMa.id_estudiante2 = ?;
    `, [userId, userId], (error, results) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.json(results);
    });
});

module.exports = router;
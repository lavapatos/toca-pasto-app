const mysql = require("mysql2");
const bcrypt = require('bcrypt');
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

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM estudiante WHERE correo = ?', [email]);
    return result;
};

const createUser = async (nombre, correo, password) => {
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 5);
    await pool.query(
        'INSERT INTO estudiante (nombre, correo, clave) VALUES (?, ?, ?)',
        [nombre, correo, hashedPassword]
    );
    const result = await pool.query('SELECT * FROM estudiante WHERE correo = ?', correo);
    return result;
};

module.exports = { findUserByEmail, createUser };
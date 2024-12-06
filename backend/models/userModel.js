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
    const result = await pool.query('SELECT * FROM users WHERE correo = $1', [email]);
    return result.rows[0];
};

//EN PROCESO
const createUser = async (nombre, correo, rut, fecha_nacimiento, genero, carrera, password) => {
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 5);
    const result = await pool.query(
        'INSERT INTO users (nombre, correo, password, wallet, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, correo, hashedPassword, 0, isAdmin]
    );
    const cartResult = await pool.query('INSERT INTO carts (user_id) SELECT id FROM users WHERE correo = $1', [correo]);
    return result.rows[0];
};

module.exports = { findUserByEmail, createUser };
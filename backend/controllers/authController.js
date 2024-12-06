const userModel = ('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');

const register = async (req, res) => {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const password = req.body.password;
    const existingUser = await userModel.findUserByEmail(correo);
    if (existingUser) {
        return res.status(400).send('Correo ya registrado.');
    }
    const user = await userModel.createUser(nombre, correo, password);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(302).cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'None'
    }).send('Registrado existosamente.');
};

const login = async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    const user = await userModel.findUserByEmail(correo);
    console.log('Usuario:', user);
    console.log('Contraseña que chantaste:', password);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Credenciales no válidas.');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(302).cookie('token', token, { httpOnly: true }).send('Logueado existosamente.');
};

module.exports = { register, login };
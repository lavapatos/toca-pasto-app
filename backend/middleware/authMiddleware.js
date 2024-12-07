const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).send('No se recibió una cookie.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        res.locals.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).send('El usuario no se encuentra autentificado.');
    }
};

const isAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).send('No tienes permisos de admin');
    }
    next();
};

module.exports = { authenticateUser, isAdmin };

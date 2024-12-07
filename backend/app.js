const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express ();
app.use(express.json());

const careerRoutes = require("./routes/careerRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const interestRoutes = require("./routes/interestRoutes.js");
const facultadRoutes = require("./routes/facultadRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const ramoRoutes = require("./routes/ramoRoutes.js");
const seccionRoutes = require("./routes/seccionRoutes.js");

app.use('/', careerRoutes, userRoutes, authRoutes, interestRoutes, facultadRoutes, adminRoutes, ramoRoutes, seccionRoutes);

app.get('/', (req, res) => {
    res.send('Testeando.');
});

app.listen(PORT, () => {
    console.log("Server Listening on http://localhost:" + PORT);
});
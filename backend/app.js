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

app.use('/', careerRoutes, userRoutes, authRoutes, interestRoutes);

app.get('/', (req, res) => {
    res.send('Testeando.');
});

app.listen(PORT, () => {
    console.log("Server Listening on http://localhost:" + PORT);
});
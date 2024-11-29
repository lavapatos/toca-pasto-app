const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express ();
app.use(express.json());

const careerRoutes = require("./routes/careerRoutes.js");

app.use('/', careerRoutes);

app.get('/', (req, res) => {
    res.send('Testeando.');
});

app.listen(PORT, () => {
    console.log("Server Listening on http://localhost:" + PORT);
});
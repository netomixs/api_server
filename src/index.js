const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Api Server"});
});

require("./routes/usuarios.route")(app);


const PORT = process.env.ALWATSDATA_HTTPD_PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Server running in port"+PORT);
});
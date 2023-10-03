require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const connect = require("./db/conn");
const login = require("./routes/login");
const db = require("./routes/db");

connect();

// Importing middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Configuring Routes
app.use("/api/login", login);
app.use("/api/db", db);

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening at port ${process.env.PORT}`);
});

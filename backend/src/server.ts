const express = require("express");
const {dbConnection} = require("./database/database");
require("dotenv").config({path: "../.env"});

const app = express();

app.use(express.static("public"));

dbConnection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});


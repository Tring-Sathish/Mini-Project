const express = require('express')
require("dotenv").config();
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
const connection = require("./Config/Database.js");
const UserRouter = require("./Routes/UserRoute");

const app = express();
app.use(cors());
mongoose.set('strictQuery', false);
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(bodyParser.json());
connection();
app.use('/', UserRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("server is running on port :" + port)
})

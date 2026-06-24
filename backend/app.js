// importer les extensions

const express = require("express");
const cors = require("cors");
const path = require("path");
const router = express.Router();
require("dotenv").config();
const app = express();

// importer de database 

const connectDB = require("./src/config/database");
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.json({
        message: "API Opérationnelle !"
    });
});

module.exports = app;
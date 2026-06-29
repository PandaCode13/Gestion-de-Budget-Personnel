// importer les extensions
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = express.Router();
require("dotenv").config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// importer les routes

const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test API
app.get("/", (req, res) => {
    res.json({
        message: "API Opérationnelle !"
    });
});

module.exports = app;
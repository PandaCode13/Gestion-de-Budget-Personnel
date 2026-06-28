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

// importer les routes

const authRoutes = require("./src/routes/auth.route");
const adminRoutes = require("./src/routes/admin.route");
const userRoutes = require("./src/routes/user.route");

app.use("/api/auth", authROutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Test API
app.get("/", (req, res) => {
    res.json({
        message: "API Opérationnelle !"
    });
});

module.exports = app;
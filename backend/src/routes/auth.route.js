const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
// const changePasswordController = require("../controllers/changePassword.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
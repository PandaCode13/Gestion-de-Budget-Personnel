const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

const userController = require("../controllers/user.controller");
// const changePasswordController = require("../controllers/changePassword.controller");

/* ========= UTILISATEUR CONNECTÉ ========= */

router.get("/me", auth, userController.getMe);

/* ========= ADMIN ========= */

router.get(
  "/",
  auth,
  isAdmin,
  userController.getAllUsers
);

router.delete(
  "/:id",
  auth,
  isAdmin,
  userController.deleteUser
);

module.exports = router;
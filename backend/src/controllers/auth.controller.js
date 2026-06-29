const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

/* ============================
   INSCRIPTION
============================ */

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Cet utilisateur existe déjà.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

/* ============================
   CONNEXION
============================ */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect.",
      });
    }

    if (!user.is_active && user.role !== "admin") {
      return res.status(403).json({
        message: "Compte désactivé.",
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

/* ============================
   MOT DE PASSE OUBLIÉ
============================ */

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
      return res.json({
        message:
          "Si cet email existe, un lien de réinitialisation sera envoyé.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await User.saveResetToken(user.id, hashedToken, expires);

    // Ici tu pourras envoyer le mail plus tard.

    res.json({
      message:
        "Si cet email existe, un lien de réinitialisation sera envoyé.",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

/* ============================
   RÉINITIALISATION
============================ */

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findByResetToken(hashedToken);

    if (!user) {
      return res.status(400).json({
        message: "Token invalide.",
      });
    }

    if (
      user.reset_password_expires &&
      new Date(user.reset_password_expires) < new Date()
    ) {
      return res.status(400).json({
        message: "Token expiré.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updatePassword(user.id, hashedPassword);

    await User.saveResetToken(user.id, null, null);

    res.json({
      message: "Mot de passe réinitialisé avec succès.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};
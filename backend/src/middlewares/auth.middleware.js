const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    // Vérifier la présence du header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token manquant.",
      });
    }

    // Récupérer le token
    const token = authHeader.split(" ")[1];

    // Vérifier le JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Rechercher l'utilisateur en base PostgreSQL
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur introuvable.",
      });
    }

    // Vérifier si le compte est actif
    if (!user.is_active && user.role !== "admin") {
      return res.status(403).json({
        message: "Votre compte a été désactivé.",
      });
    }

    // Ne jamais exposer les informations sensibles
    delete user.password;
    delete user.reset_password_token;
    delete user.reset_password_expires;

    // Ajouter l'utilisateur à la requête
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware:", error);

    return res.status(401).json({
      message: "Token invalide ou expiré.",
    });
  }
};

const User = require("../models/user.model");

/* ==========================
   PROFIL DE L'UTILISATEUR CONNECTÉ
========================== */

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    delete user.password;

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

/* ==========================
   TOUS LES UTILISATEURS
========================== */

exports.getAllUsers = async (_, res) => {
  try {
    const users = await User.findAll();

    const data = users.map((user) => {
      delete user.password;
      return user;
    });

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

/* ==========================
   SUPPRIMER UN UTILISATEUR
========================== */

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    await User.delete(req.params.id);

    res.json({
      message: "Utilisateur supprimé avec succès.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};
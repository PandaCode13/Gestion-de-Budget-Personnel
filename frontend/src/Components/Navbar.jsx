import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import logo from "../assets/gestion de budget.png";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  let navbarClass = "navbar-public";

  if (token && role === "user") {
    navbarClass = "navbar-user";
  }

  if (token && role === "admin") {
    navbarClass = "navbar-admin";
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/home");
  };

  return (
    <nav className={`navbar ${navbarClass}`}>
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Gestion de Budget" />
          <span className="brand-title">Gestion de Budget</span>
        </Link>

        {/* BOUTON MOBILE */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* MENU */}
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          {/* PUBLIC */}
          {!token && (
            <>
              <Link to="/home" onClick={closeMenu} className="nav-link">
                Accueil
              </Link>

              {/* Corrigé : /login */}
              <Link to="/login" onClick={closeMenu} className="nav-link">
                Se connecter
              </Link>

              <Link to="/register" onClick={closeMenu} className="nav-link">
                Inscription
              </Link>
            </>
          )}

          {/* USER */}
          {token && role === "user" && (
            <>
              <Link
                to="/dashboard/user"
                onClick={closeMenu}
                className="nav-link"
              >
                Dashboard
              </Link>

              <Link
                to="/dashboard/analytique"
                onClick={closeMenu}
                className="nav-link"
              >
                Analytique des données
              </Link>

              <Link
                to="/dashboard/monthDepense"
                onClick={closeMenu}
                className="nav-link"
              >
                Dépense du mois
              </Link>

              <Link
                to="/dashboard/allDepenses"
                onClick={closeMenu}
                className="nav-link"
              >
                Tous les dépenses
              </Link>

              <Link
                to="/dashboard/Revenus"
                onClick={closeMenu}
                className="nav-link"
              >
                Revenus
              </Link>

              <Link
                to="/dashboard/Categories"
                onClick={closeMenu}
                className="nav-link"
              >
                Catégories
              </Link>

              <Link
                to="/dashboard/user/profiles"
                onClick={closeMenu}
                className="nav-link"
              >
                Profil
              </Link>

              <button onClick={logout} className="logout-btn">
                Déconnexion
              </button>
            </>
          )}

          {/* ADMIN */}
          {token && role === "admin" && (
            <>
              <Link
                to="/dashboard/admin"
                onClick={closeMenu}
                className="nav-link"
              >
                Dashboard
              </Link>

              <Link
                to="/dashboard/admin/users"
                onClick={closeMenu}
                className="nav-link"
              >
                Utilisateurs
              </Link>

              <Link
                to="/dashboard/PDF-Rapport"
                onClick={closeMenu}
                className="nav-link"
              >
                PDF Rapport
              </Link>

              <Link
                to="/dashboard/Messages"
                onClick={closeMenu}
                className="nav-link"
              >
                Messages des users
              </Link>

              <Link
                to="/dashboard/admin/profil"
                onClick={closeMenu}
                className="nav-link"
              >
                Profil
              </Link>

              <button onClick={logout} className="logout-btn">
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

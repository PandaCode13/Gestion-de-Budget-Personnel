import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { login } from "./Services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      if (res.data.user.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError(
          "Ce compte a été désactivé. Veuillez contacter l'administrateur.",
        );
      } else if (err.response && err.response.status === 401) {
        setError("Identifiants invalides.");
      } else {
        setError("Erreur lors de la connexion. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Connexion</h2>
            <p>
              Connectez-vous pour accéder à votre espace de gestion de budget.
            </p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Adresse email"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />

            <button type="submit" className="btn-login">
              Se connecter
            </button>
          </form>

          <div className="login-links">
            <Link to="/forgot-password">Mot de passe oublié ?</Link>

            <p>
              Vous n'avez pas encore de compte ?
              <Link to="/register"> Inscription</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
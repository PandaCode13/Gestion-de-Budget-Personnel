import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const stats = [
    { label: "Revenus", value: "3 200 EUR" },
    { label: "Depenses", value: "1 845 EUR" },
    { label: "Epargne", value: "685 EUR" },
  ];

  const expenses = [
    { icon: "M", name: "Maison", label: "Loyer et charges", price: "850 EUR" },
    {
      icon: "A",
      name: "Alimentation",
      label: "Courses du mois",
      price: "320 EUR",
    },
    {
      icon: "T",
      name: "Transport",
      label: "Essence et pass",
      price: "145 EUR",
    },
  ];

  const features = [
    {
      icon: "01",
      title: "Suivi clair",
      text: "Visualise tes revenus, depenses et economies dans un tableau de bord simple.",
    },
    {
      icon: "02",
      title: "Budget par categorie",
      text: "Organise tes charges fixes, envies et objectifs sans perdre le fil.",
    },
    {
      icon: "03",
      title: "Decisions rapides",
      text: "Repere ce qui reste disponible avant de faire une nouvelle depense.",
    },
  ];

  return (
    <div className="home">
      <nav className="home-nav" aria-label="Navigation principale">
        <div className="brand">
          <span className="brand-mark">GB</span>
          <span>Gestion Budget</span>
        </div>

        <div className="nav-actions">
          <a className="nav-link" href="#features">
            Fonctions
          </a>
          <a className="btn btn-primary" href="#dashboard">
            Commencer
          </a>
        </div>
      </nav>

      <main className="home-main">
        <section className="hero" id="dashboard">
          <div className="hero-content">
            <p className="eyebrow">Budget personnel et familial</p>
            <h1>Controle ton argent sans te compliquer la vie.</h1>
            <p className="hero-text">
              Une interface simple pour suivre tes revenus, classer tes depenses
              et garder une vision nette de ce qu'il te reste chaque mois.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#features">
                Voir les outils
              </a>
              <a className="btn btn-secondary" href="#dashboard">
                Consulter le resume
              </a>
            </div>
          </div>

          <aside className="budget-panel" aria-label="Resume du budget mensuel">
            <div className="panel-top">
              <div>
                <p className="panel-label">Solde disponible</p>
                <p className="panel-amount">1 355 EUR</p>
              </div>
              <span className="status-pill">Mois stable</span>
            </div>

            <div className="progress" aria-hidden="true">
              <div className="progress-bar" />
            </div>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <p className="stat-label">{stat.label}</p>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>

            <div className="expense-list">
              {expenses.map((expense) => (
                <div className="expense-item" key={expense.name}>
                  <span className="expense-icon">{expense.icon}</span>
                  <div>
                    <p className="expense-name">{expense.name}</p>
                    <p className="expense-label">{expense.label}</p>
                  </div>
                  <p className="expense-price">{expense.price}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section
          className="features"
          id="features"
          aria-label="Fonctionnalites"
        >
          {features.map((feature) => (
            <article className="feature" key={feature.title}>
              <span className="feature-icon">{feature.icon}</span>
              <h2>{feature.title}</h2>
              <p>{feature.text}</p>
            </article>
          ))}
        </section>

        <section className="connexion">
          <div className="connexion-content">
            <h2>Prêt à prendre le contrôle de votre budget ?</h2>

            <p>
              Rejoignez notre plateforme pour suivre vos revenus, gérer vos
              dépenses, fixer des objectifs d'épargne et obtenir une vue claire
              de vos finances.
            </p>

            <div className="button-group">
              <Link className="btn btn-primary" to="/register">
                Créer un compte gratuitement
              </Link>

              <Link className="btn btn-secondary" to="/login">
                Se connecter
              </Link>
            </div>

            <p className="connexion-note">
              Déjà des centaines d'utilisateurs suivent leurs finances en toute
              simplicité.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

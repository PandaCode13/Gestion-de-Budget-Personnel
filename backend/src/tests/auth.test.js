const request = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mockPool = {
  query: jest.fn(),
};

jest.mock("../config/database", () => {
  const fn = async () => {};
  fn.pool = mockPool;
  return fn;
});

const app = require("../../app");

describe("Auth - Register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait créer un utilisateur avec succès", async () => {
    mockPool.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({
        rows: [{
          id: 1,
          first_name: "Jean",
          last_name: "Dupont",
          email: "jean@test.com",
          role: "user",
          is_active: true,
        }],
      });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean@test.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Utilisateur créé avec succès.");
    expect(res.body.user.email).toBe("jean@test.com");
  });

  it("devrait refuser un email déjà existant", async () => {
    mockPool.query.mockResolvedValueOnce({
      rows: [{ id: 1, email: "jean@test.com" }],
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean@test.com",
        password: "password123",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Cet utilisateur existe déjà.");
  });

  it("devrait retourner 500 en cas d'erreur serveur", async () => {
    mockPool.query.mockRejectedValue(new Error("Erreur DB"));

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean@test.com",
        password: "password123",
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Erreur serveur.");
  });
});

describe("Auth - Login", () => {
  const hashedPassword = bcrypt.hashSync("password123", 10);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait connecter un utilisateur avec succès", async () => {
    mockPool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        first_name: "Jean",
        last_name: "Dupont",
        email: "jean@test.com",
        password: hashedPassword,
        role: "user",
        is_active: true,
      }],
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "jean@test.com",
        password: "password123",
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("jean@test.com");
  });

  it("devrait refuser un email inconnu", async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "inconnu@test.com",
        password: "password123",
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Email ou mot de passe incorrect.");
  });

  it("devrait refuser un mauvais mot de passe", async () => {
    mockPool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        email: "jean@test.com",
        password: hashedPassword,
        role: "user",
        is_active: true,
      }],
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "jean@test.com",
        password: "wrongpassword",
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Email ou mot de passe incorrect.");
  });

  it("devrait refuser un compte désactivé", async () => {
    mockPool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        email: "jean@test.com",
        password: hashedPassword,
        role: "user",
        is_active: false,
      }],
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "jean@test.com",
        password: "password123",
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Compte désactivé.");
  });

  it("devrait retourner 500 en cas d'erreur serveur", async () => {
    mockPool.query.mockRejectedValue(new Error("Erreur DB"));

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "jean@test.com",
        password: "password123",
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Erreur serveur.");
  });
});

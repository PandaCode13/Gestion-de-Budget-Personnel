const { pool } = require("../config/database");

class User {
  static async create({
    firstName,
    lastName,
    email,
    password,
    role = "user",
    avatar = null,
  }) {
    const query = `
      INSERT INTO users (
        first_name,
        last_name,
        email,
        password,
        role,
        avatar,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, TRUE)
      RETURNING *;
    `;

    const values = [
      firstName,
      lastName,
      email,
      password,
      role,
      avatar,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }

  static async updatePassword(id, password) {
    const result = await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE id = $2
      RETURNING *;
      `,
      [password, id]
    );

    return result.rows[0];
  }

  static async saveResetToken(id, token, expires) {
    const result = await pool.query(
      `
      UPDATE users
      SET reset_password_token = $1,
          reset_password_expires = $2
      WHERE id = $3
      RETURNING *;
      `,
      [token, expires, id]
    );

    return result.rows[0];
  }

  static async findByResetToken(token) {
    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE reset_password_token = $1
      `,
      [token]
    );

    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );

    return result.rows;
  }

  static async delete(id) {
    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );
  }
}

module.exports = User;
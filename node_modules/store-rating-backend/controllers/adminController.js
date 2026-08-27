const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getDashboardStats = async (req, res) => {
  try {
    const usersCount = await db.query('SELECT COUNT(*) FROM users');
    const storesCount = await db.query('SELECT COUNT(*) FROM stores');
    const ratingsCount = await db.query('SELECT COUNT(*) FROM ratings');

    res.json({
      totalUsers: parseInt(usersCount.rows[0].count),
      totalStores: parseInt(storesCount.rows[0].count),
      totalRatings: parseInt(ratingsCount.rows[0].count)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, hashedPassword, address, role || 'USER']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, owner_id || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const query = `
      SELECT u.id, u.name, u.email, u.address, u.role,
             COALESCE(ROUND(AVG(r.rating), 2), 0) as rating
      FROM users u
      LEFT JOIN stores s ON u.id = s.owner_id
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY u.id
      ORDER BY u.name ASC;
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const query = `
      SELECT s.id, s.name, s.email, s.address, 
             COALESCE(ROUND(AVG(r.rating), 2), 0) as rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
      ORDER BY s.name ASC;
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
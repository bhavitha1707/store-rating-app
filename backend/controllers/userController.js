const db = require('../config/db');

exports.getStoresForUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `
      SELECT 
        s.id, s.name, s.address,
        COALESCE(ROUND(AVG(r_all.rating), 2), 0) as overall_rating,
        r_user.rating as user_rating
      FROM stores s
      LEFT JOIN ratings r_all ON s.id = r_all.store_id
      LEFT JOIN ratings r_user ON s.id = r_user.store_id AND r_user.user_id = $1
      GROUP BY s.id, r_user.rating
      ORDER BY s.name ASC;
    `;
    const result = await db.query(query, [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitRating = async (req, res) => {
  const userId = req.user.id;
  const { storeId, rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const query = `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, store_id) 
      DO UPDATE SET rating = EXCLUDED.rating, updated_at = NOW()
      RETURNING *;
    `;
    const result = await db.query(query, [userId, storeId, rating]);
    res.json({ message: 'Rating saved successfully', rating: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
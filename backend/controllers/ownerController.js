const db = require('../config/db');

exports.getOwnerDashboard = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const storeRes = await db.query('SELECT id, name FROM stores WHERE owner_id = $1', [ownerId]);
    if (storeRes.rows.length === 0) {
      return res.status(404).json({ message: 'No store assigned to this owner' });
    }

    const storeId = storeRes.rows[0].id;
    
    const statsQuery = `
      SELECT COALESCE(ROUND(AVG(rating), 2), 0) as average_rating 
      FROM ratings 
      WHERE store_id = $1;
    `;
    const statsRes = await db.query(statsQuery, [storeId]);

    const usersQuery = `
      SELECT u.name, u.email, u.address, r.rating, r.updated_at
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = $1
      ORDER BY r.updated_at DESC;
    `;
    const usersRes = await db.query(usersQuery, [storeId]);

    res.json({
      storeName: storeRes.rows[0].name,
      averageRating: statsRes.rows[0].average_rating,
      ratings: usersRes.rows
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
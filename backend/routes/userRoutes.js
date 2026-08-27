const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.use(verifyToken, authorizeRoles('USER'));

router.get('/stores', user.getStoresForUser);
router.post('/ratings', user.submitRating);

module.exports = router;
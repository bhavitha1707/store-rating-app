const express = require('express');
const router = express.Router();
const owner = require('../controllers/ownerController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.use(verifyToken, authorizeRoles('STORE_OWNER'));

router.get('/dashboard', owner.getOwnerDashboard);

module.exports = router;
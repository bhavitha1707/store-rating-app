const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const { validateUser, validateStore, validate } = require('../middleware/validation');

router.use(verifyToken, authorizeRoles('ADMIN'));

router.get('/dashboard', admin.getDashboardStats);
router.post('/users', validateUser, validate, admin.addUser);
router.post('/stores', validateStore, validate, admin.addStore);
router.get('/users', admin.getUsers);
router.get('/stores', admin.getStores);

module.exports = router;
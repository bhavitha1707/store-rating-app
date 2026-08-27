const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { validateUser, validate } = require('../middleware/validation');
const { verifyToken } = require('../middleware/auth');

router.post('/signup', validateUser, validate, auth.register);
router.post('/login', auth.login);
router.put('/update-password', verifyToken, auth.updatePassword);

module.exports = router;
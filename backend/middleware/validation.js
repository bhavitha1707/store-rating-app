const { check, validationResult } = require('express-validator');

const validateUser = [
  check('name')
    .isLength({ min: 20, max: 60 })
    .withMessage('Name must be between 20 and 60 characters.'),
  check('address')
    .isLength({ max: 400 })
    .withMessage('Address cannot exceed 400 characters.'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address.'),
  check('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters.')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must contain at least 1 uppercase letter and 1 special character.')
];

const validateStore = [
  check('name')
    .isLength({ min: 20, max: 60 })
    .withMessage('Store name must be between 20 and 60 characters.'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address.'),
  check('address')
    .isLength({ max: 400 })
    .withMessage('Address cannot exceed 400 characters.')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUser, validateStore, validate };
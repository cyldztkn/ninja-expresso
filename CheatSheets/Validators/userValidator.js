// ./validators/userValidator.js
const { body } = require('express-validator');

const userValidationRules = () => {
  return [
    body('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ];
};

module.exports = { userValidationRules };

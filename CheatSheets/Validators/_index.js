// // ./validators/userValidator.js
// const { body } = require('express-validator');

// const userValidationRules = () => {
//   return [
//     body('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
//     body('email').isEmail().withMessage('Please provide a valid email'),
//     body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
//   ];
// };

// module.exports = { userValidationRules };

const express = require('express');
const { validationResult } = require('express-validator');
const { userValidationRules } = require('./userValidator');

const app = express();
app.use(express.json());

app.post('/users', userValidationRules(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Kullanıcı verisi geçerli, işleme devam et
  res.status(201).json({ message: 'User created successfully!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


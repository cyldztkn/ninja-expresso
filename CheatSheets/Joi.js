const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

app.post('/users', (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Kullanıcı verisi geçerli, işleme devam et
  res.status(201).json({ message: 'User created successfully!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

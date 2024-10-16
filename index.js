const express = require('express');
const app = express();

// Basit bir middleware örneği
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next(); // Bir sonraki middleware'e veya route'a geçiş yap
};

// Tüm isteklerde logger middleware'ini kullan
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

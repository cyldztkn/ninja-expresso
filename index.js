const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors())

// Basit bir middleware örneği
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next(); // Bir sonraki middleware'e veya route'a geçiş yap
};

// Tüm isteklerde logger middleware'ini kullan
app.use(logger);

// Error Handling
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Something went wrong!" });
};

app.get("/", (req, res) => {
  res.status(200).json({message: "fetch ok"});
});
// Bu, diğer tüm route'lar tanımlandıktan sonra kullanılmalıdır
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const express = require("express");
const app = express();
const PORT = 3000;

// Temel bir GET isteği (route)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sunucuyu belirtilen port üzerinden başlatıyoruz
app.listen(PORT, () => {
  console.log(`Sunucu "http://localhost:${PORT}" portunda çalışıyor...`);
});

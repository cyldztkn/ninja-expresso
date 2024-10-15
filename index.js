const express = require("express");
const app = express();
const PORT = 3000;

// GET isteği: Veri almak için kullanılır
app.get("/getExample", (req, res) => {
  res.send("GET isteği ile veri alındı");
});

// POST isteği: Veri oluşturmak veya sunucuya veri göndermek için kullanılır
app.post("/postExample", (req, res) => {
  res.send("POST isteği ile veri gönderildi");
});

// PUT isteği: Mevcut bir veriyi güncellemek için kullanılır
app.put("/putExample", (req, res) => {
  res.send("PUT isteği ile veri güncellendi");
});

// DELETE isteği: Mevcut bir veriyi silmek için kullanılır
app.delete("/deleteExample", (req, res) => {
  res.send("DELETE isteği ile veri silindi");
});

// Route parametreleri: /user/1 gibi bir istek geldiğinde id'yi alır
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Kullanıcı ID: ${userId}`);
});

// Birden fazla dinamik parametre: /product/5/color/red gibi
app.get("/product/:id/color/:color", (req, res) => {
  const productId = +req.params.id;
  const productColor = req.params.color;
  res.send(`Ürün ID: ${productId}, Renk: ${productColor}`);
});

// Query string: /search?keyword=express gibi bir istek geldiğinde keyword'ü alır
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  res.send(`Arama yapılan anahtar kelime: ${keyword}`);
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

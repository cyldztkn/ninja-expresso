// HTTP modülünü dahil et
const http = require("http");

// Sunucu oluştur
const server = http.createServer((req, res) => {
  res.statusCode = 200; // HTTP yanıt kodu: 200 (Başarılı)
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello Ninja Expresso!"); // Yanıt metni
});

// Sunucu belirli bir portta dinlemeye başlar
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

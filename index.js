const http = require("http");

// Gerçek API anahtarını belirliyoruz
const REAL_API_KEY = "örnekapikey";

const server = http.createServer((req, res) => {
  // Preflight (OPTIONS) isteğini kontrol ediyoruz
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'key',
      'Access-Control-Max-Age': 86400 // Tarayıcının bu yanıtı 24 saat boyunca kullanmasına izin verir.
    });
    res.end();
    return;
  }

  // İstekten gelen API anahtarını alıyoruz
  const apikey = req.headers["key"];

  // Eğer API anahtarı doğru değilse, 401 hatası döndür
  if (apikey !== REAL_API_KEY) {
    res.statusCode = 401; // Unauthorized
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*"); // CORS başlığını ekliyoruz
    res.end(JSON.stringify({ error: "Geçersiz API anahtarı" }));
    return;
  }

  // API anahtarı doğru ise 200 OK ve veri döndür
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS başlığını ekliyoruz
  res.end(
    JSON.stringify({ message: "API anahtarı doğrulandı, veriler burada!" })
  );
});

// Sunucuyu belirli bir portta dinlet
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});

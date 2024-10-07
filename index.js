const http = require('http');

// Sunucu oluştur
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Merhaba Ninja Expresso!');
});

// Sunucuyu belirli bir portta dinlet
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
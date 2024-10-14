const http = require("http");
const fs = require("fs");
const path = require("path");

// Sunucuyu oluşturuyoruz
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    // Gelen dosyayı kaydetmek için bir yol belirliyoruz
    const filePath = path.join(__dirname, "uploads", "uploaded_file.txt");

    // Dosya yazmak için bir write stream oluşturuyoruz
    const fileStream = fs.createWriteStream(filePath);

    // Gelen veri parçalarını write stream'e yazıyoruz
    req.on("data", (chunk) => {
      fileStream.write(chunk);
    });

    // Veri transferi tamamlandığında
    req.on("end", () => {
      fileStream.end();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*"); // CORS için
      res.end(JSON.stringify({ message: "Dosya başarıyla yüklendi!" }));
    });

    // Hata olursa
    req.on("error", (err) => {
      console.error("Hata:", err);
      res.statusCode = 500;
      res.end(
        JSON.stringify({ message: "Dosya yüklenirken bir hata oluştu." })
      );
    });
  } else {
    // Başka bir endpoint'e erişilirse 404 döneriz
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Endpoint bulunamadı." }));
  }
});

// Sunucuyu belirli bir portta dinletiyoruz
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});

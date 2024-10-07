const http = require("http");

// Sunucu oluştur
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="buton">Fetch Data</button>

    <script>
      let buttonEl = document.getElementById("buton");
      buttonEl.addEventListener('click', ()=> {
        fetch('http://localhost:3000/').then(res => console.log(res))
      })
    </script>
  </body>
</html>
`);
});

// Sunucuyu belirli bir portta dinlet
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});

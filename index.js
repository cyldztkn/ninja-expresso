const fs = require('fs');

// 'data.txt' dosyasını oku
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Dosya okunamadı:', err);
    return;
  }
  console.log('Dosya içeriği:', data);
});

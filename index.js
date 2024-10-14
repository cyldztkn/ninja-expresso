const fs = require('fs');

// 'output.txt' dosyasına yaz
fs.writeFile('output.txt', 'Merhaba Ninja Expresso!', (err) => {
  if (err) {
    console.error('Dosya yazılamadı:', err);
    return;
  }
  console.log('Dosya başarıyla yazıldı!');
});

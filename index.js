const fs = require('fs');

// 'output.txt' dosyasının sonuna veri ekle
fs.appendFile('output.txt', '\nEklenen veri!', (err) => {
  if (err) {
    console.error('Veri eklenemedi:', err);
    return;
  }
  console.log('Veri başarıyla eklendi!');
});

const fs = require('fs');

// 'output.txt' dosyasını sil
fs.unlink('delete.txt', (err) => {
  if (err) {
    console.error('Dosya silinemedi:', err);
    return;
  }
  console.log('Dosya başarıyla silindi!');
});

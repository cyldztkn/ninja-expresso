const express = require('express');
const app = express();
const PORT = 3000;

// GET isteği: Veri almak için kullanılır
app.get('/getExample', (req, res) => {
    res.send('GET isteği ile veri alındı');
});

// POST isteği: Veri oluşturmak veya sunucuya veri göndermek için kullanılır
app.post('/postExample', (req, res) => {
    res.send('POST isteği ile veri gönderildi');
});

// PUT isteği: Mevcut bir veriyi güncellemek için kullanılır
app.put('/putExample', (req, res) => {
    res.send('PUT isteği ile veri güncellendi');
});

// DELETE isteği: Mevcut bir veriyi silmek için kullanılır
app.delete('/deleteExample', (req, res) => {
    res.send('DELETE isteği ile veri silindi');
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

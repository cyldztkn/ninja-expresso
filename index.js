const path = require('path');

// 1. Dosya yolunu birleştir
const filePath = path.join(__dirname, 'uploads', 'uploaded_file.txt');
console.log(`Dosya Yolu: ${filePath}`);

// 2. Dosya adını ve dizinini al
console.log(`Dosya Adı: ${path.basename(filePath)}`);
console.log(`Dizin: ${path.dirname(filePath)}`);

// 3. Dosya uzantısını al
console.log(`Dosya Uzantısı: ${path.extname(filePath)}`);

// 4. Mutlak yol kontrolü
console.log(`Mutlak mı? ${path.isAbsolute(filePath)}`);

const os = require('os');

// İşletim sistemi bilgileri
console.log(`Platform: ${os.platform()}`);
console.log(`Mimari: ${os.arch()}`);
console.log(`CPU'lar: ${JSON.stringify(os.cpus(), null, 2)}`);
console.log(`Toplam Bellek: ${os.totalmem()} bayt`);
console.log(`Boş Bellek: ${os.freemem()} bayt`);
console.log(`Sistem Uptime: ${os.uptime()} saniye`);
console.log(`Ev Dizini: ${os.homedir()}`);
console.log(`Ağ Arayüzleri: ${JSON.stringify(os.networkInterfaces(), null, 2)}`);

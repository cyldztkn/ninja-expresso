// Mongoose'u dahil ediyoruz.
const mongoose = require("mongoose");

// MongoDB bağlantısı için URI (Connection String) - Bu genellikle .env dosyasından alınır.
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

// MongoDB'ye bağlanma işlemi.
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true, // Eski URL parser yerine yeni URL parser'ı kullan
    useUnifiedTopology: true, // Daha kararlı bir bağlantı için birleşik topolojiyi kullan
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((error) => console.error("MongoDB bağlantı hatası:", error));

// Schema tanımlaması - Bir kullanıcı veritabanı yapısı tanımlıyoruz.
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 18 },
});

// Post şeması tanımlaması.
// Burada authorId'nin bir ObjectId olması ve 'User' modeline referans vermesi zorunlu kılınıyor.
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User modeline referans veriyoruz.
      required: true,
    },
  });

// Model tanımlaması - Kullanıcı modelini oluşturuyoruz.
const User = mongoose.model("User", userSchema);

// Create (Yeni veri eklemek)
// Bu fonksiyon, yeni bir kullanıcı ekler.
const createUser = async (userData) => {
  try {
    const user = new User(userData); // Yeni bir kullanıcı örneği oluştur
    const savedUser = await user.save(); // Veritabanına kaydet
    console.log("Yeni kullanıcı eklendi:", savedUser);
  } catch (error) {
    console.error("Kullanıcı eklenemedi:", error);
  }
};

// Read (Veri Okuma)
// Tüm kullanıcıları getir.
const getAllUsers = async () => {
  try {
    const users = await User.find(); // Tüm kullanıcıları getirir
    console.log("Kullanıcılar:", users);
  } catch (error) {
    console.error("Kullanıcılar getirilemedi:", error);
  }
};

// Belirli bir kullanıcıyı ID ile getir.
const getUserById = async (id) => {
  try {
    const user = await User.findById(id); // ID'ye göre kullanıcıyı bulur
    if (!user) {
      console.log("Kullanıcı bulunamadı");
    } else {
      console.log("Kullanıcı:", user);
    }
  } catch (error) {
    console.error("Kullanıcı getirilemedi:", error);
  }
};

// Update (Veri Güncelleme)
// Belirli bir kullanıcıyı ID ile güncelle.
const updateUserById = async (id, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // new: true -> güncel veriyi döner, runValidators: true -> şema doğrulamasını uygular
    );
    if (!updatedUser) {
      console.log("Kullanıcı güncellenemedi: Kullanıcı bulunamadı");
    } else {
      console.log("Kullanıcı güncellendi:", updatedUser);
    }
  } catch (error) {
    console.error("Kullanıcı güncellenemedi:", error);
  }
};

// Delete (Veri Silme)
// Belirli bir kullanıcıyı ID ile sil.
const deleteUserById = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id); // ID'ye göre kullanıcıyı siler
    if (!deletedUser) {
      console.log("Kullanıcı silinemedi: Kullanıcı bulunamadı");
    } else {
      console.log("Kullanıcı silindi:", deletedUser);
    }
  } catch (error) {
    console.error("Kullanıcı silinemedi:", error);
  }
};

// Diğer Sorgu Yöntemleri:

// 1. Belirli bir isimde kullanıcıları getir.
const getUserByName = async (name) => {
  try {
    const users = await User.find({ name: name }); // Adı belirli olan kullanıcıları getir
    console.log("İsimle eşleşen kullanıcılar:", users);
  } catch (error) {
    console.error("Kullanıcılar getirilemedi:", error);
  }
};

// 2. Yaşı 30'dan büyük olan kullanıcıları getir.
const getUsersAbove30 = async (age) => {
  try {
    const users = await User.find({ age: { $gt: age } }); // Yaşı belirli bir değerden büyük olan kullanıcılar
    console.log(`Yaşı ${age}'den büyük kullanıcılar:`, users);
  } catch (error) {
    console.error("Kullanıcılar getirilemedi:", error);
  }
};

// 3. E-posta adresinde belirli bir kelime geçen kullanıcıları getir.
const getUsersByEmailContains = async (keyword) => {
  try {
    const users = await User.find({
      email: { $regex: keyword, $options: "i" },
    }); // E-posta adresinde keyword geçen kullanıcıları getir
    console.log(`E-posta adresinde '${keyword}' geçen kullanıcılar:`, users);
  } catch (error) {
    console.error("Kullanıcılar getirilemedi:", error);
  }
};

// 4. Birden fazla koşul ile sorgulama: adı "Ali" ve yaşı 20'den büyük kullanıcılar.
const getUserByNameAndAge = async (name, age) => {
  try {
    const users = await User.find({ name: name, age: { $gt: age } }); // Adı Ali olan ve yaşı 20'den büyük kullanıcılar
    console.log("Koşullarla eşleşen kullanıcılar:", users);
  } catch (error) {
    console.error("Kullanıcılar getirilemedi:", error);
  }
};

// Eklenen Diğer Sorgular:

// 1. Yaşı belirli bir değerden büyük olan kullanıcıları getirme.
const getUsersAboveAge = async (age) => {
    try {
      const users = await User.find({ age: { $gt: age } });
      console.log(`Yaşı ${age}'den büyük kullanıcılar:`, users);
    } catch (error) {
      console.error("Kullanıcılar getirilemedi:", error);
    }
  };
  
  // 2. Belirli bir kullanıcıyı referans alan postları getirme.
  const getPostsByAuthorId = async (authorId) => {
    try {
      const posts = await Post.find({ authorId });
      console.log(`Author ID'si ${authorId} olan postlar:`, posts);
    } catch (error) {
      console.error("Postlar getirilemedi:", error);
    }
  };
  

// Örnek kullanım (Kodları çalıştırırken bu satırları yorumdan çıkar):
// createUser({ name: "Ali", email: "ali@example.com", age: 25 });
// getAllUsers();
// getUserById("6712dd5c9975bc501a51fdfb");
// updateUserById("6712dd5c9975bc501a51fdfb", { name: "Ali Güncellendi" });
// deleteUserById("6712dd5c9975bc501a51fdfb");
// getUserByName("Ali");
// getUsersAboveAge(30);
// getUsersByEmailContains("example");
// getUserByNameAndAge("Ali", 20);

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // JSON verilerini işlemek için
app.use(express.urlencoded({ extended: true }));

// JSON dosyalarının yollarını belirleyelim
const authorsFilePath = path.join(__dirname, "DB", "authors.json");
const postsFilePath = path.join(__dirname, "DB", "posts.json");

// JSON dosyasını okuyan yardımcı fonksiyon
const readData = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
  });
};

// GET ALL AUTHORS
app.get("/authors", async (req, res) => {
  try {
    const authors = await readData(authorsFilePath);
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error reading authors", error });
  }
});

// GET ALL POSTS
app.get("/posts", async (req, res) => {
  try {
    const posts = await readData(postsFilePath);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error reading posts", error });
  }
});

// GET AUTHOR BY ID
app.get("/author/:id", async (req, res) => {
  try {
    const authors = await readData(authorsFilePath);
    const author = authors.find((item) => item.id === parseInt(req.params.id));
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Error reading author", error });
  }
});

// GET POST BY ID (Düzeltilmiş)
app.get("/post/:id", async (req, res) => {
  try {
    const posts = await readData(postsFilePath);
    const post = posts.find((item) => item.id === parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error reading post", error });
  }
});

// delete bost by ıd
app.delete("/post/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const posts = await readData(postsFilePath);

    // Silinecek post'un olup olmadığını kontrol et
    const postIndex = posts.findIndex((item) => item.id === postId);
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    // DELETE POST
    posts.splice(postIndex, 1);

    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating posts", err });
      }
      res.json({ message: "Post deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
});

// CREATE NEW POST
app.post("/post", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    // Temel doğrulama: title, content ve authorId olup olmadığını kontrol edelim
    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ message: "Title, content and authorId are required" });
    }

    // JSON dosyasından mevcut post'ları alalım
    const posts = await readData(postsFilePath);

    // Yeni bir id oluştur. Bu, mevcut en büyük id'ye 1 ekleyerek yapılır.
    const newId =
      posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;

    const newPost = {
      id: newId,
      title,
      content,
      authorId: parseInt(authorId),
    };

    // Yeni post'u mevcut post listesine ekle
    posts.push(newPost);

    // Güncellenmiş posts dizisini JSON dosyasına yaz
    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error saving the new post", error: err });
      }
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    });
  } catch (error) {}
});
// UPDATE EXISTING POST
app.patch("/post/:id", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const postId = parseInt(req.params.id);

    // Temel doğrulama: title, content ve authorId olup olmadığını kontrol edelim
    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ message: "Title, content and authorId are required" });
    }

    // JSON dosyasından mevcut post'ları alalım
    const posts = await readData(postsFilePath);

    // İlgili post'un indeksini bulalım
    const postIndex = posts.findIndex((post) => post.id === postId);

    // Eğer post bulunamazsa, 404 döndür
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Post'u güncelle
    posts[postIndex] = {
      ...posts[postIndex],
      title,
      content,
      authorId: parseInt(authorId), // authorId'yi sayıya çevir
    };

    // Güncellenmiş posts dizisini JSON dosyasına yaz
    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error saving the updated post", error: err });
      }
      res.status(200).json({
        message: "Post updated successfully",
        post: posts[postIndex],
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});

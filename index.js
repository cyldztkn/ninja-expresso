const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./models/post");
const addNewPost = require("./addPost");
const addNewUser = require("./addUser.js");
console.log(addNewUser);
require("dotenv").config();

// Db Connect
const conn = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "blogdeneme",
    })
    .then(() => {
      console.log("db bağlandı");
    })
    .catch((err) => console.log(err));
};
conn();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Basit bir GET isteği (Test için)
app.get("/", (req, res) => {
  res.send("Merhaba, Ninja Expresso API çalışıyor!");
});

// Add new Post
app.post("/addPost", (req, res) => {
  const { title, content, authorId } = req.body;
  let newPost = { title, content, authorId };
  console.log(newPost);

  if (!title || !content || !authorId) {
    return res
      .status(400)
      .json({ message: "Title, content and authorId are required" });
  }

  addNewPost(newPost);
  res.status(200).json({
    message: "Post Başarıyla Eklendi",
    title: title,
    content: content,
    author: authorId,
  });
});

// Add new User
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  let newUser = { name, email };
  // console.log("newUser Değişkeni", newUser);

  if (!name || !email) {
    return res.status(400).json({ message: "isim ve mail zorunludur" });
  }

  addNewUser(newUser);
  res.status(200).json({ message: "Kullanıcı Başarıyla eklendi" });
});

// Sunucuyu dinlemeye başla
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

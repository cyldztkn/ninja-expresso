const express = require("express");
const cors = require("cors"); // cors paketini dahil edin

const app = express();
const PORT = 3000;
app.use(cors());

// Verileri tutacak basit diziler
const authors = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  { id: 4, name: "Bob Brown", email: "bob@example.com" },
];

const posts = [
  {
    id: 1,
    title: "Post-One",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.",
    authorId: 1,
  },
  {
    id: 2,
    title: "Post Two",
    content:
      " ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.",
    authorId: 2,
  },
  {
    id: 3,
    title: "Post Three",
    content:
      "dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.",
    authorId: 1,
  },
  {
    id: 4,
    title: "Post Four",
    content:
      "sit amet, consectetur adipiscing elit. Sed do eiusmod.",
    authorId: 3,
  },
  {
    id: 5,
    title: "Post Five",
    content:
      "amet, consectetur adipiscing elit. Sed do eiusmod.",
    authorId: 4,
  },
  {
    id: 6,
    title: "Post Six",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.",
    authorId: 2,
  },
];

// GET ALL AUTHORS
app.get("/authors", (req, res) => {
  res.json(authors);
});

// GET AUTHOR
app.get("/author/:id", (req, res) => {
  const author = authors.find((x) => x.id === parseInt(req.params.id));
  if (!author) {
    return res.status(404).json({ message: "not found" });
  }
  res.json(author);
});

// GET ALL POSTS
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET POST
app.get("/post/:id", (req, res) => {
  const post = posts.find((x) => x.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "yok ki" });
  }
  return res.json(post);
});

// GET ALL POST AT AUTHOR
app.get("/author/:id/posts", (req, res) => {
  const authorId = parseInt(req.params.id);
  const authorPosts = posts.filter((item) => item.authorId === authorId);
  if (authorPosts.length === 0) {
    return res.status(404).json({ message: "Yazısı Bulunamadı" });
  }
  res.json(authorPosts);
});

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});

const Post = require("./models/post");

let addNewPost = (newPostValues) => {
  const newPost = new Post({
    title: newPostValues.title,
    content: newPostValues.content,
    authorId: newPostValues.authorId,
  });

  newPost
    .save()
    .then((post) => console.log("başarılı", post))
    .catch((err) => console.error(err));
};

module.exports = addNewPost;

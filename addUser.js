const User = require("./models/user");

let addNewUser = (newUserValues) => {
  const newUser = new User({
    name: newUserValues.name,
    email: newUserValues.email,
  });

  newUser
    .save()
    .then((user) => console.log("Yeni kullanıcı kaydedildi:", user))
    .catch((err) => console.error("Kullanıcı kaydedilemedi:", err));
};

module.exports = addNewUser;

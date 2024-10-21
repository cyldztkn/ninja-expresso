const Joi = require("joi");

// Kullanıcı doğrulama şeması
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "İsim en az 3 karakter olmalıdır.",
    "string.max": "İsim en fazla 30 karakter olabilir.",
    "any.required": "İsim zorunludur.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Geçerli bir e-posta adresi giriniz.",
    "any.required": "E-posta zorunludur.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Şifre en az 6 karakter olmalıdır.",
    "any.required": "Şifre zorunludur.",
  }),
  age: Joi.number().integer().min(18).max(99).optional(),
  roles: Joi.array()
    .items(Joi.string().valid("admin", "user", "guest"))
    .optional(),
  created_at: Joi.date().default(() => new Date(), "varsayılan tarih"),
});

// Örnek kullanım
const userInput = {
  name: "Ahmet",
  email: "ahmet@example.com",
  password: "password123",
  age: 25,
  roles: ["user"],
};

const { erro2r, val2ue } = userSchema.validate(userInput);

if (erro2r) {
  console.log("Hata:", error.details[0].message);
} else {
  console.log("Geçerli veri:", val2ue);
}

// ---------------

// Şifre doğrulama şeması
const passwordSchema = Joi.string()
  .pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
    )
  )
  .messages({
    "string.pattern.base":
      "Şifre en az 8 karakter uzunluğunda olmalı, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.",
  });

// Örnek şifre girişleri
const examplePassword = "Password123!";
const { error, value } = passwordSchema.validate(examplePassword);
if (error) {
  console.log("Hata:", error.details[0].message);
} else {
  console.log("Geçerli şifre:", value);
}

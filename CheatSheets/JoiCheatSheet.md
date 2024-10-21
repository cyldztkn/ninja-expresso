
### Joi Cheat Sheet

#### Kurulum

```bash
npm install joi
```

#### Joi'yi Projeye Dahil Etme

```javascript
const Joi = require('joi');
```

---

#### 1. Temel Veri Tipleri

| Veri Tipi      | Kullanımı                                  | Açıklama                                    |
|----------------|--------------------------------------------|---------------------------------------------|
| `Joi.string()` | `Joi.string().required()`                  | String türünde bir değer.                   |
| `Joi.number()` | `Joi.number().integer().min(1).max(100)`   | Number türünde bir değer. Min ve max değerler ekleyebilirsin. |
| `Joi.boolean()`| `Joi.boolean()`                            | Boolean türünde bir değer.                  |
| `Joi.date()`   | `Joi.date().iso()`                         | Date türünde bir değer. ISO formatı için `.iso()` eklenebilir. |
| `Joi.array()`  | `Joi.array().items(Joi.string())`          | Belirli türde elemanlar içeren bir dizi.    |
| `Joi.object()` | `Joi.object({ key: Joi.string() })`        | Belirli anahtar-değer çiftlerini doğrulayan nesne. |

---

#### 2. String Doğrulama

| Method                | Örnek Kullanım                                       | Açıklama                                             |
|-----------------------|------------------------------------------------------|------------------------------------------------------|
| `min(length)`         | `Joi.string().min(3)`                                 | En az `3` karakter olmalı.                            |
| `max(length)`         | `Joi.string().max(10)`                                | En fazla `10` karakter olmalı.                        |
| `email()`             | `Joi.string().email()`                                | Geçerli bir e-posta adresi olmalı.                    |
| `pattern(regex)`      | `Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)`          | Belirli bir düzenli ifadeyle eşleşmeli.               |
| `valid(...values)`    | `Joi.string().valid('admin', 'user', 'guest')`        | Belirli değerlerden biri olmalı.                      |
| `alphanum()`          | `Joi.string().alphanum()`                             | Yalnızca alfanümerik karakterler içerebilir.          |

---

#### 3. Number Doğrulama

| Method                | Örnek Kullanım                                       | Açıklama                                             |
|-----------------------|------------------------------------------------------|------------------------------------------------------|
| `min(value)`          | `Joi.number().min(1)`                                 | En az `1` olmalı.                                    |
| `max(value)`          | `Joi.number().max(100)`                               | En fazla `100` olmalı.                               |
| `integer()`           | `Joi.number().integer()`                              | Tam sayı olmalı.                                     |
| `positive()`          | `Joi.number().positive()`                             | Pozitif bir sayı olmalı.                             |
| `negative()`          | `Joi.number().negative()`                             | Negatif bir sayı olmalı.                             |
| `precision(digits)`   | `Joi.number().precision(2)`                           | Ondalık kısmı `2` basamak olmalı.                    |

---

#### 4. Array Doğrulama

| Method                | Örnek Kullanım                                       | Açıklama                                             |
|-----------------------|------------------------------------------------------|------------------------------------------------------|
| `items(type)`         | `Joi.array().items(Joi.string())`                     | Dizinin her elemanı belirli bir türde olmalı.         |
| `min(length)`         | `Joi.array().min(2)`                                  | En az `2` eleman olmalı.                             |
| `max(length)`         | `Joi.array().max(5)`                                  | En fazla `5` eleman olmalı.                          |
| `unique()`            | `Joi.array().items(Joi.number()).unique()`            | Dizi elemanları benzersiz olmalı.                    |
| `length(length)`      | `Joi.array().length(3)`                               | Dizi tam olarak `3` eleman içermeli.                 |

---

#### 5. Object Doğrulama

| Method                | Örnek Kullanım                                       | Açıklama                                             |
|-----------------------|------------------------------------------------------|------------------------------------------------------|
| `keys()`              | `Joi.object().keys({ name: Joi.string() })`           | Nesnenin belirli anahtarları ve tiplerini doğrular.  |
| `unknown()`           | `Joi.object().unknown(true)`                          | Tanımlanmayan ek anahtarlara izin verir.             |
| `length()`            | `Joi.object().length(2)`                              | Nesne `2` anahtar içermeli.                          |

---

#### 6. Conditional ve Diğer Özellikler

| Method                | Örnek Kullanım                                       | Açıklama                                             |
|-----------------------|------------------------------------------------------|------------------------------------------------------|
| `when()`              | `Joi.number().when('anotherField', { is: 5, then: Joi.number().min(10) })` | Belirli bir başka alanın değerine göre koşullu doğrulama. |
| `default(value)`      | `Joi.string().default('Anonim')`                      | Varsayılan değer atar.                               |
| `required()`          | `Joi.string().required()`                             | Alan zorunlu hale gelir.                             |
| `optional()`          | `Joi.string().optional()`                             | Alan isteğe bağlı hale gelir.                        |
| `forbidden()`         | `Joi.string().forbidden()`                            | Alanın gönderilmesini yasaklar.                      |
| `valid(values)`       | `Joi.string().valid('option1', 'option2')`            | Sadece belirtilen değerlerden biri olmalı.           |

---

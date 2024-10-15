const express = require("express");
const app = express();
const PORT = 3000;
const productRouter = express.Router();

productRouter.get('/:id', (req, res) => {
    res.send(`Ürün ID: ${req.params.id}`);
});

productRouter.get('/:id/reviews', (req, res) => {
    res.send(`Ürün ID: ${req.params.id} için yorumlar`);
});

app.use('/product', productRouter);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

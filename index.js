const express = require('express');
const app = express();
const productRouter = express.Router();
const colorRouter = express.Router();

productRouter.get('/:productId', (req, res) => {
    res.send(`Ürün: ${req.params.productId}`);
});

colorRouter.get('/:colorId/product/:productName', (req, res) => {
    res.send(`Renk ID: ${req.params.colorId}, Ürün Adı: ${req.params.productName}`);
});

app.use('/product', productRouter);
app.use('/color', colorRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

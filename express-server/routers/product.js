const router = require("express").Router();
const Order = require("../models/order");
const Product = require("../models/product");
// const {authExactor} = require("../utils/middleware")

// router.use(authExactor)

router.get("/getAll", (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.json(err);
        }
        res.json(products);
    })
});

router.post("/add", async (req, res) => {
    const {name, price, description} = req.body;
    const product = new Product({name, price, description});
    await product.save();
    res.json(product);
});



module.exports = router;

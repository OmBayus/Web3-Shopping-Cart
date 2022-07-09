const router = require("express").Router();
const Order = require("../models/order");
const Product = require("../models/product");
// const {authExactor} = require("../utils/middleware")

// router.use(authExactor)

router.get("/getAll", (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.status(500).json(err);
        }
        res.json(products);
    })
});

router.post("/add", async (req, res) => {
    const {name, price,img, description} = req.body;
    const product = new Product({name, price,img, description});
    product.save()
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
});



module.exports = router;

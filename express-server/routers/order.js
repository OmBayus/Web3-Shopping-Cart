const router = require("express").Router();
const Order = require("../models/order");
const Product = require("../models/product");
// const {authExactor} = require("../utils/middleware")

// router.use(authExactor)

router.post("/create", async (req, res) => {
    const {product,email} = req.body;
    const order = new Order({product, email, isPaid:false});
    res.json(order);
});

router.post("/pay", (req, res) => {
    const {id} = req.body;
    Order.findById(id, (err, order) => {
        if (err) {
            res.json({error: err});
        } else {
            order.isPaid = true;
            order.save((err, order) => {
                if (err) {
                    res.json({error: err});
                } else {
                    res.json(order);
                }
            });
        }
    });
});

router.post("/getAll", (req, res) => {
    Order.find({}, (err, orders) => {
        if (err) {
            res.json({error: err});
        } else {
            res.json(orders);
        }
    });
});

router.post("/get/:id", (req, res) => {
    const {id} = req.params;
    Order.findById(id, (err, order) => {
        if (err) {
            res.json({error: err});
        } else {
            res.json(order);
        }
    });
});

module.exports = router;

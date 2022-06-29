const router = require("express").Router();
const Order = require("../models/order");
const { abi } = require("../constants/abi");
const ethers = require("ethers");
const config = require("../utils/config")
const Product = require("../models/product");
// const {authExactor} = require("../utils/middleware")

// router.use(authExactor)

router.post("/create", async (req, res) => {
  const { product, email } = req.body;
  const order = new Order({ product, email, isPaid: false });
  await order.save();
  res.json(order);
});

router.post("/pay", (req, res) => {
  const { id } = req.body;
  Order.findById(id, async (error, order) => {
    if (error) {
      res.json(error);
    } else {
      if (order) {
        const provider = new ethers.providers.JsonRpcBatchProvider(config.CHAIN_URL);
        const contractAddress = "0xe92807bF78323d96Bf91D68353C79A3fA33bA3A9";
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const result = await contract.getOrder(id);
        if (result) {
          order.isPaid = true;
          order.save((err, newOrder) => {
            if (err) {
              res.json({ error: err });
            } else {
              res.json(newOrder);
            }
          });
        }
        else{
          res.json({error: "Order has not been paid yet"})
        }
      } else {
        res.json({ error: "Order not found" });
      }
    }
  });
});

router.get("/getAll", (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(orders);
    }
  });
});

router.get("/get/:id", (req, res) => {
  const { id } = req.params;
  Order.findById(id, (err, order) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(order);
    }
  });
});

module.exports = router;

const router = require("express").Router();
const Order = require("../models/order");
const { abi } = require("../constants/abi");
const ethers = require("ethers");
const config = require("../utils/config")
const Product = require("../models/product");
// const {authExactor} = require("../utils/middleware")

// router.use(authExactor)

router.post("/create", async (req, res) => {
  const { products, email } = req.body;
  let price = 0;
  for(let product of products) {
    const temp = await Product.findById(product.product)
    price += temp.price * product.quantity
  }
  const order = new Order({ products, email,price:price.toFixed(8), isPaid: false,receiver:"" });
  await order.save();
  res.json(order);
});

router.post("/pay", (req, res) => {
  const { id,receiver } = req.body;
  Order.findOne({_id:id}).populate('products.product').exec(async(error, order) => {
    if (error) {
      res.json(error);
    } else {
      if (order) {
        if(order.isPaid){
          return res.json(order)
        }
        const provider = new ethers.providers.JsonRpcBatchProvider(config.CHAIN_URL);
        const contractAddress = config.CONTRACT_ADDRESS;
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const result = await contract.getOrder(id);
        if (Number(result.toString()) >= Number(ethers.utils.parseEther(order.price.toString()))) {
          order.isPaid = true;
          order.receiver = receiver;
          order.save((err, newOrder) => {
            if (err) {
              res.status(500).json(err);
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
      res.status(500).json(err);
    } else {
      res.json(orders);
    }
  });
});

router.get("/getByAddress/:address", (req, res) => {
  const { address } = req.params;
  Order.find({receiver:address}, (err, orders) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(orders);
    }
  });
});

router.get("/get/:id", (req, res) => {
  const { id } = req.params;
  Order.findOne({_id:id}).populate('products.product').exec((err, order) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(order);
    }
  });
});

module.exports = router;

const router = require("express").Router();
const Order = require("../models/order");
const Product = require("../models/product");
// const {authExactor} = require("../utils/middleware")

// router.use(authExactor)

router.post("/create", async (req, res) => {});

router.post("/pay", (req, res) => {});

router.post("/getAll", (req, res) => {
});

router.post("/get/:id", (req, res) => {
});

module.exports = router;

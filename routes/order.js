const router = require("express").Router();
const Order = require("../models/Order");

//Create a Order
router.post("/", async (req, res) => {
  try {
    const {
        products,
        totalPrice,
        buyer,
        address,
        status,
    } = req.body;
    const newOrder = new Order({
        products: products,
        totalPrice: totalPrice,
        buyer: buyer,
        address : address,
        status: status,
    });
    await newOrder.save();
    res.status(200).send(newOrder);
  } catch (err) {
    console.log(err);
  }
});

//Update Order
router.put("/:id", async (req, res) => {
  try {
    const Order = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Order has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Delete Order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get a Order
router.get("/:id", async (req, res) => {
  try {
    const Order = await Order.findById(req.params.id);
    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all Order
router.get("/", async (req, res) => {
  try {
    const orderList = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orderList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

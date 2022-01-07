const router = require("express").Router();
const Product = require("../models/Product");

//Create a Product
router.post("/", async (req, res) => {
  try {
    const {
        userID,
        title,
        category,
        priceIn,
        priceOut,
        description,
        phone,
        address,
        image,
        images,
        dateIn,
        dateOut,
        status,
    } = req.body;
    const newProduct = new Product({
      userID : userID,
      title : title,
      category : category,
      priceIn : priceIn,
      priceOut : priceOut,
      description : description,
      phone : phone,
      address : address,
      image : image,
      images : images,
      dateIn : dateIn,
      dateOut : dateOut,
      status : status,
    });
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (err) {
    console.log(err);
  }
});

//Update Product
router.put("/:id", async (req, res) => {
  try {
    const Product = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Product has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get a Product
router.get("/:id", async (req, res) => {
  try {
    const Product = await Product.findById(req.params.id);
    res.status(200).json(Product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all Product
router.get("/", async (req, res) => {
  try {
    const productList = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(productList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product of Category
router.get("/all/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const productList = await Product.find({ category: category });
    const productCount = await Product.find({ category: category }).count({});
    res.status(200).json({
      productList: productList,
      productCount: productCount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get Category Sales
router.get("/sales/:category", async (req, res) => {
    try {
    let total = 0;
    let profit = 0;
      const { category } = req.params;
      const productList = await Product.find({ category: category , status : "Da ban"});
      const productCount = await Product.find({ category: category ,  status : "Da ban"}).count({});
     productList.map((x)=>{
         profit = profit + parseInt(x.priceIn); 
         total = total +  parseInt(x.priceOut); 
     })
     profit = total - profit;
      res.status(200).json({
        sales: total,
        profit :  profit,
        productCount: productCount,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;

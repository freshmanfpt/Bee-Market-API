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
    const product = await Product.findByIdAndUpdate(req.params.id, {
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
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all Product
router.get("/", async (req, res) => {
  try {
  let total = 0;
  let profit = 0;
    const productSold = await Product.find({ status : "Da ban"});
    const productSoldCount = await Product.find({ status : "Da ban"}).count({});
    const productList = await Product.find().sort({ createdAt: -1 });
    const productListCount = await Product.find().sort({ createdAt: -1 }).count({});
    productSold.map((x)=>{
       profit = profit + parseInt(x.priceIn); 
       total = total +  parseInt(x.priceOut); 
   })
   profit = total - profit;
    res.status(200).json({
      sales: total,
      profit :  profit,
      productList: productList,
      productListCount: productListCount,
      productSold : productSold,
      productSoldCount :productSoldCount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product of Category
router.get("/all/:category", async (req, res) => {
  console.log(req.params);
  try {
    const { category } = req.params;
    const productList = await Product.find({ category: category });
    const productCount = await Product.find({ category: category }).count({});
    res.status(200).json({
      productCount: productCount,
      productList: productList,
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
        productList: productList
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;

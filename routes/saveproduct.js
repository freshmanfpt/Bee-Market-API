const router = require("express").Router();
const SaveProduct = require("../models/SaveProduct");

//Create a SaveProduct
router.post("/", async (req, res) => {
  try {
    const {
        user,
        userID,
        productID,
        title,
        category,
        price,
        description,
        image,
        images,
    } = req.body;
    const newProduct = new SaveProduct({
    user:user,
      userID : userID,
      productID : productID,
      title : title,
      category : category,
      price : price,
      description : description,
      image : image,
      images : images,
    });
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (err) {
    console.log(err);
  }
});

//Update SaveProduct
router.put("/:id", async (req, res) => {
  try {
    const saveProduct = await SaveProduct.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Product has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Delete SaveProduct
router.delete("/:id", async (req, res) => {
  try {
    await SaveProduct.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get a SaveProduct
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await SaveProduct.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get saveProduct of user
router.get("/:userID", async (req, res) => {
    try {
      const { userID } = req.params;
      const savepostList = await SaveProduct.find({ user: userID });
      res.status(200).json(savepostList);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;

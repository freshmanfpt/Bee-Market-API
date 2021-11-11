const router = require("express").Router();
const Category = require("../models/Category");

//Create a post
router.post("/", async (req, res) => {
  try {
    const { icon, name } = req.body;
    const newSavePost = new Category({
      icon,
      name,
    });
    await newSavePost.save();
    res.status(200).send(newSavePost);
  } catch (err) {
    console.log(err);
  }
});

//Delete Post
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get post of user
router.get("/", async (req, res) => {
  try {
    const savepostList = await Category.find();
    res.status(200).json(savepostList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

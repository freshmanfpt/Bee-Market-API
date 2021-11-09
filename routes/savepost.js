const router = require("express").Router();
const SavePost = require("../models/SavePost");

//Create a post
router.post("/", async (req, res) => {
  try {
    const {
      user,
      title,
      price,
      category,
      image,
      images,
      description,
      phone,
      address,
      userID,
    } = req.body;
    const newSavePost = new SavePost({
      user,
      title,
      price,
      category,
      image,
      images,
      description,
      phone,
      address,
      userID,
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
    await SavePost.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get post of user
router.get("/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const savepostList = await SavePost.find({ user: userID });
    res.status(200).json(savepostList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const Post = require("../models/Post");

//Create a post
router.post("/", async (req, res) => {
  try {
    const {
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
    const newPost = new Post({
      title: title,
      price: price,
      category: category,
      image: image,
      images: images,
      description: description,
      phone: phone,
      address: address,
      userID: userID,
    });
    await newPost.save();
    res.status(200).send(newPost);
  } catch (err) {
    console.log(err);
  }
});

//Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Post has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Delete Post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all post
router.get("/", async (req, res) => {
  try {
    const postList = await Post.find().populate({
      path: "userID",
      select: "-password",
    }).sort( {'timestamp': -1});

    res.status(200).json(postList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get post of user
router.get("/userPost/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const postList = await Post.find({ userID: userID }).populate({
      path: "userID",
      select: "-password",
    });
    const postCount = await Post.find({ userID: userID }).count({});
    res.status(200).json({
      postList: postList,
      postCount: postCount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

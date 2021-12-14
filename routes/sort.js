const router = require("express").Router();
const Post = require("../models/Post");

router.get("/title-az", async (req, res) => {
  try {
    const postList = await Post.find()
      .populate({
        path: "userID",
        select: "-password",
      })
      .sort({ title: 1 });

    res.status(200).json(postList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/title-za", async (req, res) => {
  try {
    const postList = await Post.find()
      .populate({
        path: "userID",
        select: "-password",
      })
      .sort({ title: -1 });

    res.status(200).json(postList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/price-asc", async (req, res) => {
  try {
    const postList = await Post.find()
      .populate({
        path: "userID",
        select: "-password",
      })
      .sort({ price: 1 });

    res.status(200).json(postList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/price-desc", async (req, res) => {
  try {
    const postList = await Post.find()
      .populate({
        path: "userID",
        select: "-password",
      })
      .sort({ price: -1 });

    res.status(200).json(postList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

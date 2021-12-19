const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update User
router.put("/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/password/:id", async (req, res) => {
  try {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const user = await User.findById(req.params.id);
    const validPassword = await bcrypt.compare(
      req.body.passwordOld,
      user.password
    );
    !validPassword && res.status(200).json({ password: false });
    await User.findByIdAndUpdate(req.params.id, {
      password: hashPass,
    });
    res.status(200).json("Account has been updated");
  } catch (error) {
    return res.status(500).json(err);
  }
});

router.put("/block/:id", async (req, res) => {
  try {
    //Hash password
    await User.findByIdAndUpdate(req.params.id, {
      isBlocked: true,
    });
    res.status(200).json("Account has been updated");
  } catch (error) {
    return res.status(500).json(err);
  }
});

router.put("/unblock/:id", async (req, res) => {
  try {
    //Hash password
    await User.findByIdAndUpdate(req.params.id, {
      isBlocked: false,
    });
    res.status(200).json("Account has been updated");
  } catch (error) {
    return res.status(500).json(err);
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get a User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/place/:place", async (req, res) => {
  try {
    const user = await User.find({ place: req.params.place });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all user
router.get("/", async (req, res) => {
  try {
    const userList = await User.find().select("-password");
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

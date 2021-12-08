const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, avatar, isAdmin, address, phone,isBlocked ,place} = req.body;

    //Check
    const emailCheck = await User.findOne({ email: email });
    emailCheck && res.status(404).send("Email exist");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    //Create
    const user = new User({
      name: name,
      email: email,
      password: hashPass,
      avatar: avatar,
      isAdmin: isAdmin,
      address: address,
      phone: phone,
      isBlocked: isBlocked,
      place: place,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    !user && res.status(404).send("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).send("Wrong pass");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

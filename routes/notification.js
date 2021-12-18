const router = require("express").Router();
const admin = require("firebase-admin");
const Notification = require("../models/Notification");

const serviceAccount = require("../firebaseAdmin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [];

router.post("/createNotification", (req, res) => {
  tokens.push(req.body.token);
  res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.post("/", async (req, res) => {
  try {
    const { title, body, imageUrl } = req.body;
    if (tokens.length > 0) {
      await admin.messaging().sendMulticast({
        tokens,
        notification: {
          title,
          body,
          imageUrl,
        },
      });
    }
    const newNoti = new Notification({ title, body, image: imageUrl });
    await newNoti.save();
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const getNoti = await Notification.find();
    res.status(200).json(getNoti);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete success");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

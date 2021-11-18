const router = require("express").Router();
const admin = require("firebase-admin");

const serviceAccount = require("../firebaseAdmin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [];

router.post("/createNotification", (req, res) => {
  tokens.push(req.body.token);
  console.log("debug-token", tokens);

  res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.post("/", async (req, res) => {
  try {
    const { title, body, imageUrl } = req.body;
    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
        imageUrl,
      },
    });
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});

module.exports = router;

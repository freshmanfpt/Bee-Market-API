const router = require("express").Router();
const Conversation = require("../models/Conversation");

router.post("/", async (req, res) => {
  const { senderID, receiverID } = req.body;
  const newConversation = new Conversation({
    members: [senderID, receiverID],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getConversation/:userID", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userID] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/checkConversation", async (req, res) => {
  let userID = req.query.userID;
  let receiverID = req.query.receiverID;
  console.log(req.query);
  try {
    const conversation = await Conversation.find({
      members: [userID, receiverID],
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

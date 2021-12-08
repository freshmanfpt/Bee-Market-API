const router = require("express").Router();
const Report = require("../models/Report");

//Create a post
router.post("/", async (req, res) => {
  try {
    const { postID, userID, content ,reporterID} = req.body;
    const newReport = new Report({
      userID: userID,
      postID: postID,
      content: content,
      reporterID:reporterID,
    });
    await newReport.save();
    res.status(200).send(newReport);
  } catch (err) {
    console.log(err);
  }
});

//Get post of user
router.get("/", async (req, res) => {
  try {
    const reportList = await Report.find()
      .populate("postID")
      .populate("userID");
    res.status(200).json(reportList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

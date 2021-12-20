const router = require("express").Router();
const Report = require("../models/Report");

//Create a post
router.post("/", async (req, res) => {
  try {
    const { reporterID, postReported, content ,reporterPersonID,state} = req.body;
    const newReport = new Report({
      reporterID: reporterID,
      postReported: postReported,
      content: content,
      reporterPersonID:reporterPersonID,
      state:state,
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

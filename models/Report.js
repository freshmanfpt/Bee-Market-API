const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: "true",
      ref: "User",
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);

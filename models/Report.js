const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

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
    reporterID:{
      type: mongoose.Schema.Types.ObjectId,
      required: "true",
      ref: "User",
    },
    status:{
      type:Boolean,
      required:"true"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);

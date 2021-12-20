const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const ReportSchema = new mongoose.Schema(
  {
    reporterID: {
      type: mongoose.Schema.Types.ObjectId,
      required: "true",
      ref: "User",
    },
    postReported: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    content: {
      type: String,
      required: true,
    },
    reporterPersonID:{
      type: mongoose.Schema.Types.ObjectId,
      required: "true",
      ref: "User",
    },
    state:{
      type:String,
      required:"true"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);

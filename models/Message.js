const mongoose = require("mongoose");
const { getHHMMDDMMYYY } = require("../until/getDateNow");

const MeesageSchema = new mongoose.Schema(
  {
    conversationID: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MeesageSchema);

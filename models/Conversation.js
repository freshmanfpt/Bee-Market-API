const mongoose = require("mongoose");
const { getHHMMDDMMYYY } = require("../until/getDateNow");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);

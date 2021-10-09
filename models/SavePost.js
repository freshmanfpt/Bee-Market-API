const mongoose = require("mongoose");

const SavePostSchema = new mongoose.Schema(
  {
    userID: {
      type: "String",
      required: "true",
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavePost", SavePostSchema);

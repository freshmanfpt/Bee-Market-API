const mongoose = require("mongoose");
const { getHHMMDDMMYYY } = require("../until/getDateNow");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    create: {
      type: "String",
      default: getHHMMDDMMYYY,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);

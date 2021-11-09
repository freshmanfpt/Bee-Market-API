const mongoose = require("mongoose");

const SavePostSchema = new mongoose.Schema(
  {
    user: {
      type: "String",
      required: "true",
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SavePost", SavePostSchema);

const mongoose = require("mongoose");
const { getDDMMYYYY } = require("../until/getDateNow");
const { getHHMMDDMMYYY } = require("../until/getDateNow");
const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:"admin"
    },
    title: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        default: "",
    },
    priceIn: {
        type: Number,
        required: true,
    },
    priceOut: {
        type: Number,
        required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    dateIn: {
      type: "String",
        default: getHHMMDDMMYYY,
    },
    dateOut: {
        type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Chua ban",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

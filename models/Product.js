const mongoose = require("mongoose");
const { getDDMMYYYY } = require("../until/getDateNow");

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
        type: String,
        default: "",
    },
    priceOut: {
        type: String,
      default: "",
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
    image: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    dateIn: {
        type: String,
        default: getDDMMYYYY,
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

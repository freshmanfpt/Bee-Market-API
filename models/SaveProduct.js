const mongoose = require("mongoose");
const { getDDMMYYYY } = require("../until/getDateNow");

const ProductSchema = new mongoose.Schema(
  {
    user: {
        type: String,
        required: "true",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:"admin"
    },
    productID:{
        type: String,
        required: "true",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        default: "",
    },
    price: {
        type: String,
      default: "",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

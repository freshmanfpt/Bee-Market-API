const mongoose = require("mongoose");
const { getDDMMYYYY } = require("../until/getDateNow");

const ProductSchema = new mongoose.Schema(
  {
    name: {
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
    dateIn: {
        type: String,
        default: "",
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

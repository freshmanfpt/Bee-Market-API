const mongoose = require("mongoose");
const { getDDMMYYYY } = require("../until/getDateNow");

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: Array,
    },
    totalPrice: {
        type: String,
        default: "",
    },
    buyer: {
        type: String,
      default: "",
    },
    orderDate: {
        type: "String",
        default: getDDMMYYYY,
    },
    address:{
      type: String,
      default: "",
    },
    phone:{
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

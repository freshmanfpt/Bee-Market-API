const mongoose = require("mongoose");
const { getDDMMYYYY } = require("../until/getDateNow");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    isBlocked:{
      type: Boolean,
      default :false,
    },
    place:{
      type: String,
      default: "",
    },
    dateJoin: {
      type: "String",
      default: getDDMMYYYY,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

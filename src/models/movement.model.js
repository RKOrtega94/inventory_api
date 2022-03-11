const mongoose = require("mongoose");

const movementSchema = mongoose.Schema({
  voucher: { type: String, required: true },
  product: { type: String, required: true },
  inout: { type: String, required: true },
  quantity: { type: Number, required: true },
  state: { type: Boolean, default: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("movement", movementSchema);

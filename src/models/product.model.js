const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  promotion: { type: Boolean, default: false },
  state: { type: Boolean, default: true },
});

module.exports = mongoose.model("product", productSchema);

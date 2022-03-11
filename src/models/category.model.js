const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: Boolean, default: true },
});

module.exports = mongoose.model("category", categorySchema);

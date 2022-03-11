const express = require("express");
const Product = require("../models/product.model");

const app = express.Router();

app.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  let result = createProduct(body);
  res.send({
    message: "Product created successfully",
    product: result,
  });
});

app.put("/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let result = updateProduct(id, body);
  res.send({
    message: "Product updated successfully",
    product: result,
  });
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;
  let result = deleteProduct(id);
  res.send({
    message: "Product deleted successfully",
    product: result,
  });
});

async function createProduct(body) {
  let product = new Product({
    name: body.name,
    price: body.price,
    description: body.description,
    image: body.image,
  });
  console.log(product);
  return await product.save();
}

async function updateProduct(id, body) {
  let product = await Product.findByIdAndUpdate(id, body, { new: true });
  return product;
}

async function deleteProduct(id) {
  let product = await Product.findByIdAndDelete(id);
  return product;
}

module.exports = app;

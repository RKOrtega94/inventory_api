const express = require("express");
const Category = require("../models/category.model");

const app = express.Router();

app.get("/", (req, res) => {
  Category.find()
    .then((categorys) => res.json(categorys))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/:id", (req, res) => {
  Category.findById(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  createCategory(body)
    .then((result) =>
      res.send({ message: "Category created successfully", category: result })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

app.put("/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let result = updateCategory(id, body);
  res.send({
    message: "category updated successfully",
    category: result,
  });
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;
  let result = deleteCategory(id);
  res.send({
    message: "category deleted successfully",
    category: result,
  });
});

async function createCategory(body) {
  let category = new Category({
    name: body.name,
    price: body.price,
    description: body.description,
    image: body.image,
  });
  return await category.save();
}

async function updateCategory(id, body) {
  let category = await category.findByIdAndUpdate(id, body, { new: true });
  return category;
}

async function deleteCategory(id) {
  let category = await category.findByIdAndDelete(id);
  return category;
}

module.exports = app;

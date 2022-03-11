const express = require("express");
const Movement = require("../models/movement.model");

const app = express.Router();

app.get("/", (req, res) => {
  Movement.find()
    .then((Movements) => res.json(movements))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/:id", (req, res) => {
  movement
    .findById(req.params.id)
    .then((Movement) => res.json(Movement))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  createMovement(body)
    .then((result) =>
      res.send({ message: "Movement created successfully", Movement: result })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

app.put("/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let result = updateMovement(id, body);
  res.send({
    message: "Movement updated successfully",
    movement: result,
  });
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;
  let result = deleteMovement(id);
  res.send({
    message: "Movement deleted successfully",
    movement: result,
  });
});

async function createMovement(body) {
  let movement = new Movement({
    name: body.name,
    price: body.price,
    description: body.description,
    image: body.image,
  });
  return await movement.save();
}

async function updateMovement(id, body) {
  let movement = await Movement.findByIdAndUpdate(id, body, { new: true });
  return movement;
}

async function deleteMovement(id) {
  let movement = await Movement.findByIdAndDelete(id);
  return movement;
}

module.exports = app;

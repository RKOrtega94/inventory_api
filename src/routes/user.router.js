const express = require("express");
const User = require("../models/user.model");

const app = express.Router();

app.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/", async (req, res) => {
  let body = req.body;
  await createUser(body)
    .then((result) =>
      res.send({ message: "User created successfully", user: result })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

app.put("/:id", async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  await updateUser(id, body)
    .then((result) =>
      res.send({ message: "User updated successfully", user: result })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

app.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await deleteUser(id)
    .then((result) => res.send({ message: "User deleted", user: result }))
    .catch((err) => res.status(400).json("Error: " + err));
});

async function createUser(body) {
  let user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  return await user.save();
}

async function updateUser(id, body) {
  let user = await User.findByIdAndUpdate(id, body, { new: true });
  return user;
}

async function deleteUser(id) {
  let user = await User.findByIdAndDelete(id);
  return user;
}

module.exports = app;

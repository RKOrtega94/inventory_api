const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", async (req, res) => {
  let body = req.body;
  let result = await createUser(body);
  res.send({
    message: "User created successfully",
    user: result,
  });
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let result = await updateUser(id, body);
  res.send({
    message: "User updated successfully",
    user: result,
  });
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let result = await deleteUser(id);
  res.send({
    message: "User deleted successfully",
    user: result,
  });
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

module.exports = router;

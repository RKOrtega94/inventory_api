const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const verifyToken = require("../middlewares/auth.middleware");

const app = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "es", "ec"] },
    })
    .required(),
  password: Joi.string().min(6).max(50).required(),
});

app.get("/", verifyToken, async (req, res) => {
  await User.find()
    .select({ name: 1, email: 1, _id: 0 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/:id", verifyToken, async (req, res) => {
  await User.findById(req.params.id)
    .select({ name: 1, email: 1, _id: 0 })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/", verifyToken, async (req, res, next) => {
  let body = req.body;
  await User.findOne({ email: body.email }, (err, user) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    }
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
  });
  let { value, error } = schema.validate(body);
  if (!error) {
    createUser(value)
      .then((result) =>
        res.send({
          message: "User created successfully",
          user: { name: result.name, email: result.email },
        })
      )
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    return res.status(400).json(error);
  }
});

app.put("/:id", verifyToken, async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  updateUser(id, body)
    .then((result) =>
      res.send({
        message: "User updated successfully",
        user: { name: result.name, email: result.email },
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

app.delete("/:id", verifyToken, async (req, res) => {
  let id = req.params.id;
  deleteUser(id)
    .then((result) =>
      res.send({
        message: "User deleted",
        user: { name: result.name, email: result.email },
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

async function createUser(body) {
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });
  return await user.save();
}

async function updateUser(id, body) {
  const password = bcrypt.hashSync(body.password, 10);
  body.password = password;
  let user = await User.findByIdAndUpdate(id, body, { new: true });
  return user;
}

async function deleteUser(id) {
  let user = await User.findByIdAndDelete(id);
  return user;
}

module.exports = app;

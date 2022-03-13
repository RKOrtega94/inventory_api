const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const app = express.Router();

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) console.log(err);
  })
    .then((user) => {})
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

module.exports = app;

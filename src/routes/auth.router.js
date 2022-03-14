const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const app = express.Router();

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const query = User.findOne({ email: email });
  await query.clone().exec((err, user) => {
    if (err) {
      res.status(400).json("Error: " + err);
    }
    if (user) {
      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid)
        return res.status(400).json({ message: "Wrong email or password" });
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ token: token, user: { name: user.name, email: user.email } });
    } else {
      res.send({
        message: "Wrong email or password",
      });
    }
  });
});

module.exports = app;

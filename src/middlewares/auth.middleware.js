require("dotenv").config();
const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
  let token = req.get("Authorization");
  console.log("token: ", token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  });
  next();
};

module.exports = verifyToken;

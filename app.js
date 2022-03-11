require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Declare routes
const userRouter = require("./src/routes/user.router");

// Initialize app
const url = `mongodb+srv://${process.env.MONGODB_USER || "user"}:${
  process.env.MONGODB_PASS
}@${process.env.MONGODB_CLOUSTER || "clouster.mongodb.net"}/${
  process.env.MONGODB_DB || "myFirstDatabase"
}?retryWrites=true&w=majority`;

mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

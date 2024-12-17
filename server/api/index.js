const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/TasksModel.js");
const taskRoute = require("../routes/TasksRoute.js");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(
    "mongodb+srv://ynaloispangilinan:STEAAPp8wjbNgMjM@db.tg3xlim.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DB"
  )
  .then(() => {
    console.log("Connected to Database.");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch(() => {
    console.log("Connection failed.");
  });

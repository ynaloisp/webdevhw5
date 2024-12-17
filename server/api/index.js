const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoute = require("../routes/TasksRoute.js"); // Ensure the path is correct
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use("/api/tasks", taskRoute); // Matches the tasks route in TasksRoute.js

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://ynaloispangilinan:STEAAPp8wjbNgMjM@db.tg3xlim.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DB",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Database.");
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });

// Vercel requires you to export the app as a handler
module.exports = app;

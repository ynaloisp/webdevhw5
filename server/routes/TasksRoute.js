const express = require("express");
const Task = require("../models/TasksModel.js");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/TasksController.js");

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);

//update a Task
router.put("/:id", updateTask);

//delete a Task
router.delete("/:id", deleteTask);

module.exports = router;

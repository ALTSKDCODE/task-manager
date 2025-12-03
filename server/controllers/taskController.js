const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

//Get Route
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
});

//Create Route
const createTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title');
  }

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
  });
  res.status(200).json(task);
});

//Edit Route
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check user authorization
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

//Delete Route
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check user authorization
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await task.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

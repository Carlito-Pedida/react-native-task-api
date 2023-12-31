import { RequestHandler } from "express";
import { Task } from "../models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  let title = await Task.findAll();
  res.status(200).json(title);
};

export const createTask: RequestHandler = async (req, res, next) => {
  let newTitle: Task = req.body;
  if (newTitle.title) {
    let created = await Task.create(newTitle);
    res.status(200).json(created);
  } else {
    res.status(400).send().json({ error: "Task Cancelled" });
  }
};

export const toggleTask: RequestHandler = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.titleId);

    // Find the task by its primary key
    const taskToUpdate = await Task.findByPk(itemId);

    if (!taskToUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task properties
    if (req.body.title !== undefined) {
      taskToUpdate.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
      taskToUpdate.completed = req.body.completed;
    }

    // Save the updated task
    await taskToUpdate.save();

    res.status(200).json(taskToUpdate);
  } catch (error) {
    next(error); // Pass the error to the Express error handler
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  let titleId = req.params.titleId;
  let titleFound = await Task.findByPk(titleId);

  if (titleFound) {
    await Task.destroy({
      where: { titleId: titleId }
    });
    res.status(202).json();
  } else {
    res.status(404).json();
  }
};

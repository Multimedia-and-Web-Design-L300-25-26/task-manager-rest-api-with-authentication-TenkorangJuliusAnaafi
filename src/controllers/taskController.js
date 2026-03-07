import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user
    });

    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
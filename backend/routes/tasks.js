const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Get all tasks with filtering and sorting
router.get("/", async (req, res) => {
    const { shift, status, priority, sort } = req.query;

    let query = {};
    if (shift) query.shiftAssigned = shift;
    if (status) query.status = status;
    if (priority) query.priority = priority;

    let tasks = Task.find(query);

    // Sorting: e.g., sort=-priority will sort in descending order
    if (sort) {
        const sortParams = sort.split(",").join(" ");
        tasks = tasks.sort(sortParams);
    }

    res.json(await tasks);
});

// Add a new task
router.post("/", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

// Update a task's status
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedTask);
});

// Assign a user to a task
router.patch("/:id/assign", async (req, res) => {
    const { id } = req.params;
    const { assignedTo } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, { assignedTo }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error assigning user to task" });
    }
});

// Toggle task status between "Pending" and "Completed"
router.patch("/:id/toggle-status", async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Toggle the status
        task.status = task.status === "Pending" ? "Completed" : "Pending";
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error toggling task status" });
    }
});


module.exports = router;

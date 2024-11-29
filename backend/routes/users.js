const express = require("express");
const User = require("../models/User");
const Task = require("../models/Task")
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Add a new user
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error adding user" });
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    try {
        // Find the user
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update tasks assigned to this user
        const updateResult = await Task.updateMany(
            { assignedTo: user.name },
            { assignedTo: "Unassigned" }
        );

        // Delete the user
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: `User ${user.name} deleted and tasks updated` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

module.exports = router;

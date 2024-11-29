const express = require("express");
const HandoverNote = require("../models/HandoverNote");
const router = express.Router();

// Add new handover note
router.post("/", async (req, res) => {
    const note = new HandoverNote(req.body);
    await note.save();
    res.status(201).json(note);
});

// Get notes for a specific shift
router.get("/:shift", async (req, res) => {
    const { shift } = req.params;
    const notes = await HandoverNote.find({ shift }).sort({ createdAt: -1 });
    res.json(notes);
});

module.exports = router;

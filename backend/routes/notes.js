const express = require("express");
const HandoverNote = require("../models/HandoverNote");
const router = express.Router();

// Get all handover notes for all shifts (Morning, Afternoon, Night)
router.get("/", async (req, res) => {
    try {
        const notes = await HandoverNote.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching handover notes" });
    }
});

// Get handover notes for a shift
router.get("/:shift", async (req, res) => {
    try {
        const notes = await HandoverNote.find({ shift: req.params.shift }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching handover notes" });
    }
});

// Add a new handover note
router.post("/", async (req, res) => {
    try {
        const note = new HandoverNote(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Error saving handover note" });
    }
});

module.exports = router;

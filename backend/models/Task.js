const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    source: { type: String, required: true },
    shiftAssigned: { type: String, enum: ["Morning", "Afternoon", "Night"], required: true },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    assignedTo: { type: String, default: "Unassigned" },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);

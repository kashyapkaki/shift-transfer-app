const mongoose = require("mongoose");

const HandoverNoteSchema = new mongoose.Schema({
    shift: { type: String, required: true },
    note: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HandoverNote", HandoverNoteSchema);

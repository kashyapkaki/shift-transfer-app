const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Operator", "Supervisor"], default: "Operator" },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
import React, { useState } from "react";
import axios from "axios";
import "../styles/AddTaskForm.css"

const AddTaskForm = () => {
    const [task, setTask] = useState({
        title: "",
        details: "",
        source: "",
        shiftAssigned: "Morning",
        priority: "High",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/tasks", task).then(() => {
            alert("Task added successfully!");
            setTask({ title: "", details: "", source: "", shiftAssigned: "Morning", priority: "High" });
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    placeholder="Title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Details:</label>
                <textarea
                    placeholder="Details"
                    value={task.details}
                    onChange={(e) => setTask({ ...task, details: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Source:</label>
                <input
                    type="text"
                    placeholder="Source"
                    value={task.source}
                    onChange={(e) => setTask({ ...task, source: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Shift Assigned:</label>
                <select
                    value={task.shiftAssigned}
                    onChange={(e) => setTask({ ...task, shiftAssigned: e.target.value })}
                    required
                >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Night">Night</option>
                </select>
            </div>
            <div>
                <label>Status:</label>
                <select
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div>
                <label>Priority Level:</label>
                <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    required
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div>
                <button type="submit">Add Task</button>
            </div>
        </form>
    );
};

export default AddTaskForm;

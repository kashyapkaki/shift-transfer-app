import React, { useState } from "react";
import axios from "axios";

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
            <input
                type="text"
                placeholder="Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
            />
            <textarea
                placeholder="Details"
                value={task.details}
                onChange={(e) => setTask({ ...task, details: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Source"
                value={task.source}
                onChange={(e) => setTask({ ...task, source: e.target.value })}
                required
            />
            <select
                value={task.shiftAssigned}
                onChange={(e) => setTask({ ...task, shiftAssigned: e.target.value })}
            >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Night">Night</option>
            </select>
            <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;

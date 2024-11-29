import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskHistory = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch completed tasks
    const fetchHistory = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/tasks/history");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching task history:", error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div>
            <h3>Task History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Completed At</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.details}</td>
                            <td>{new Date(task.completedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskHistory;

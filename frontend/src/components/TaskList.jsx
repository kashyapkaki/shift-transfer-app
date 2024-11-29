import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import axios from 'axios'
import '../styles/TaskList.css'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchTasksAndUsers();
    }, []);

    const fetchTasksAndUsers = (filters = {}) => {
        const query = new URLSearchParams(filters).toString();
        axios.get(`http://localhost:5000/api/tasks?${query}`).then((res) => setTasks(res.data));
        axios.get("http://localhost:5000/api/users").then((res) => setUsers(res.data));
    };

    const assignUser = (taskId, userId) => {
        axios.patch(`http://localhost:5000/api/tasks/${taskId}/assign`, { assignedTo: userId }).then((res) => {
            setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
        });
    };

    // Toggle task status
    const toggleStatus = async (taskId) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/tasks/${taskId}/toggle-status`);
            // Update the task list with the updated task status
            setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
        } catch (error) {
            console.error("Error toggling task status:", error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <FilterBar onFilterChange={fetchTasksAndUsers} />
            <div className="task-list-cards">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task._id} className="task-card">
                            <h3>{task.title}</h3>
                            <p><strong>Details:</strong> {task.details}</p>
                            <p><strong>Source:</strong> {task.source}</p>
                            <p><strong>Shift Assigned:</strong> {task.shiftAssigned}</p>
                            <p><strong>Status:</strong> {task.status}</p>
                            <p><strong>Priority:</strong> {task.priority}</p>
                            <p><strong>Assigned To:</strong> {task.assignedTo === "Unassigned" ? "Unassigned" : task.assignedTo}</p>
                            <div className="task-actions">
                                <select
                                    className="assign-user"
                                    onChange={(e) => assignUser(task._id, e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Assign User
                                    </option>
                                    {users.map((user) => (
                                        <option key={user._id} value={user.name}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => toggleStatus(task._id)}>
                                    Mark as {task.status === "Pending" ? "Completed" : "Pending"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;

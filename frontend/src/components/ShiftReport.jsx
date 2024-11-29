import React, { useEffect, useState } from "react";
import axios from "axios";

const ShiftReport = () => {
    const [shift, setShift] = useState("Morning");
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tasks?shift=${shift}`).then((res) => setTasks(res.data));
        axios.get(`http://localhost:5000/api/notes/${shift}`).then((res) => setNotes(res.data));
    }, [shift]);

    return (
        <div>
            <h3>Shift Report</h3>

            {/* Shift selection dropdown */}
            <div>
                <label>Select Shift: </label>
                <select value={shift} onChange={(e) => setShift(e.target.value)}>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Night">Night</option>
                </select>
            </div>

            <h4>Tasks for {shift} Shift</h4>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.status} (Priority: {task.priority})
                    </li>
                ))}
            </ul>

            <h4>Notes for {shift} Shift</h4>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>{note.note}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShiftReport;

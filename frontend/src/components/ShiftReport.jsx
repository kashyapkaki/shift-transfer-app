import React, { useEffect, useState } from "react";
import axios from "axios";

const ShiftReport = ({ shift }) => {
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tasks?shift=${shift}`).then((res) => setTasks(res.data));
        axios.get(`http://localhost:5000/api/notes/${shift}`).then((res) => setNotes(res.data));
    }, [shift]);

    return (
        <div>
            <h3>Shift Report for {shift}</h3>
            <h4>Tasks</h4>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.status} (Priority: {task.priority})
                    </li>
                ))}
            </ul>
            <h4>Notes</h4>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>{note.note}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShiftReport;

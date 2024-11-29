import React, { useState, useEffect } from "react";
import axios from "axios";

const HandoverNotes = ({ shift }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    const fetchNotes = () => {
        axios.get(`http://localhost:5000/api/notes/${shift}`).then((res) => setNotes(res.data));
    };

    const addNote = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/notes", { shift, note: newNote }).then(() => {
            setNewNote("");
            fetchNotes();
        });
    };

    useEffect(() => {
        fetchNotes();
    }, [shift]);

    return (
        <div>
            <h3>Handover Notes for {shift} Shift</h3>
            <form onSubmit={addNote}>
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note..."
                ></textarea>
                <button type="submit">Add Note</button>
            </form>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>{note.note}</li>
                ))}
            </ul>
        </div>
    );
};

export default HandoverNotes;

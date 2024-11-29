import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/HandoverNotes.css"

const HandoverNotes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [shift, setShift] = useState("Morning"); // Default shift

    // Fetch handover notes for the selected shift
    const fetchNotes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/notes/${shift}`);
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching handover notes:", error);
        }
    };

    // Add a new handover note
    const addNote = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/notes", { shift, note: newNote });
            setNotes([response.data, ...notes]);
            setNewNote("");
        } catch (error) {
            console.error("Error adding handover note:", error);
        }
    };

    // Fetch notes when the component mounts or shift changes
    useEffect(() => {
        fetchNotes();
    }, [shift]);

    return (
        <div>
            <h3>Handover Notes</h3>

            {/* Shift selection */}
            <div>
                <label>Select Shift: </label>
                <select value={shift} onChange={(e) => setShift(e.target.value)}>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Night">Night</option>
                </select>
            </div>

            {/* Add new note */}
            <form onSubmit={addNote}>
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new handover note..."
                ></textarea>
                <button type="submit">Add Note</button>
            </form>

            {/* Display notes for the selected shift */}
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        {note.note} (Created: {new Date(note.createdAt).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HandoverNotes;

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "Operator" });

    useEffect(() => {
        axios.get("http://localhost:5000/api/users").then((res) => setUsers(res.data));
    }, []);

    const addUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/users", newUser).then((res) => {
            setUsers([...users, res.data]);
            setNewUser({ name: "", email: "", role: "Operator" });
        });
    };

    return (
        <div>
            <h2>Users</h2>
            <form onSubmit={addUser}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="Operator">Operator</option>
                    <option value="Supervisor">Supervisor</option>
                </select>
                <button type="submit">Add User</button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} ({user.role})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

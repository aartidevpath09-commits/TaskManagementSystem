import React, { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // 🔥 add

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleSubmit = async () => {
    try {
      const res = await createUser({
        name,
        email,
        password, // 🔥 MUST
      });

      console.log("USER ADDED:", res.data);

      loadUsers();

      // 🔥 clear fields
      setName("");
      setEmail("");
      setPassword("");

      alert("User added");
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("BACKEND MSG:", err.response?.data);
      alert("Error adding user");
    }
  };

  return (
    <div>
      <h2>Users</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* 🔥 NEW PASSWORD FIELD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Add User</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
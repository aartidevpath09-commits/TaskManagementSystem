import React, { useEffect, useState } from "react";
import { getComments, addComment, getUsers } from "../services/api";

function Comments({ taskId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, [taskId]);

  const loadData = async () => {
    try {
      const c = await getComments(taskId);
      const u = await getUsers();

      setComments(c.data);
      setUsers(u.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  // 🔥 STEP 1: DEBUG + ERROR LOGGING ADDED
  const handleAdd = async () => {
    if (!text.trim() || !userId) {
      alert("Fill all fields");
      return;
    }

    try {
      const payload = {
        text: text.trim(),
        taskItemId: taskId,
        userId: Number(userId),
        createdAt: new Date() // 🔥 important
      };

      console.log("SENDING COMMENT:", payload); // 🔍 DEBUG

      const res = await addComment(payload);

      console.log("COMMENT ADDED:", res.data); // 🔍 DEBUG

      setText("");
      setUserId("");

      loadData();

    } catch (err) {
      console.log("FULL ERROR:", err); // 🔥 STEP 1
      console.log("BACKEND MSG:", err.response?.data); // 🔥 STEP 1
      alert("Error adding comment");
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}>
      <h4>Comments</h4>

      <input
        placeholder="Write comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>

      <button onClick={handleAdd}>Add</button>

      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.text} - <b>{c.user?.name}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
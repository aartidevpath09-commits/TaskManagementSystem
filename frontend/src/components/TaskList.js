import React, { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  getProjects,
  getUsers,
  updateTask,
  deleteTask,
} from "../services/api";
import Comments from "./Comments";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  const [openComments, setOpenComments] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const t = await getTasks();
    const p = await getProjects();
    const u = await getUsers();

    setTasks(t.data);
    setProjects(p.data);
    setUsers(u.data);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Enter title");
    if (!projectId) return alert("Select project");
    if (!userId) return alert("Select user");

    await createTask({
      title,
      status,
      projectId: Number(projectId),
      userId: Number(userId),
    });

    loadData();

    setTitle("");
    setProjectId("");
    setUserId("");
    setStatus("Pending");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadData();
  };

  const handleStatusChange = async (task, newStatus) => {
    await updateTask(task.id, {
      title: task.title,
      status: newStatus,
      projectId: task.projectId,
      userId: task.userId,
    });

    loadData();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* 🔥 FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button onClick={handleSubmit}>Add Task</button>
      </div>

      <hr />

      {/* 🔥 TASK LIST (CARD UI) */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              background: "#fff",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {/* 🔥 TITLE */}
            <b style={{ fontSize: "16px" }}>{t.title}</b>

            {/* 🔥 PROJECT + USER */}
            <div style={{ marginTop: "5px", color: "#555" }}>
              📁 {t.project?.name} | 👤 {t.user?.name}
            </div>

            {/* 🔥 ACTIONS */}
            <div style={{ marginTop: "10px" }}>
              <select
                value={t.status}
                onChange={(e) => handleStatusChange(t, e.target.value)}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <button
                onClick={() => handleDelete(t.id)}
                style={{ background: "red", marginLeft: "10px" }}
              >
                Delete
              </button>

              {/* 🔥 COMMENTS TOGGLE */}
              <button
                onClick={() =>
                  setOpenComments(openComments === t.id ? null : t.id)
                }
                style={{ marginLeft: "10px", background: "#007bff" }}
              >
                {openComments === t.id ? "Hide Comments" : "Show Comments"}
              </button>
            </div>

            {/* 🔥 COMMENTS SECTION */}
            {openComments === t.id && (
              <div style={{ marginTop: "10px" }}>
                <Comments taskId={t.id} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
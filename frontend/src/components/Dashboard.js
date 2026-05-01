import React, { useEffect, useState } from "react";
import { getTasks, getUsers, getProjects } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    tasks: 0,
    users: 0,
    projects: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const t = await getTasks();
    const u = await getUsers();
    const p = await getProjects();

    const tasks = t.data;

    setStats({
      tasks: tasks.length,
      users: u.data.length,
      projects: p.data.length,
      pending: tasks.filter(x => x.status === "Pending").length,
      completed: tasks.filter(x => x.status === "Done").length,
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* CARD */}
        <div style={cardStyle}>📋 Tasks: {stats.tasks}</div>
        <div style={cardStyle}>👤 Users: {stats.users}</div>
        <div style={cardStyle}>📁 Projects: {stats.projects}</div>
        <div style={cardStyle}>🟡 Pending: {stats.pending}</div>
        <div style={cardStyle}>🟢 Done: {stats.completed}</div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  minWidth: "150px",
  textAlign: "center",
  fontWeight: "bold",
};

export default Dashboard;
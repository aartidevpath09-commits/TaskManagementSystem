import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

import TaskList from "./components/TaskList";
import UserList from "./components/UserList";
import ProjectList from "./components/ProjectList";
import KanbanBoard from "./components/KanbanBoard";
import ActivityLog from "./components/ActivityLog";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");
  const [showLogin, setShowLogin] = useState(true);

  // 🔐 AUTH SCREEN
  if (!token) {
    return (
      <>
        {showLogin ? (
          <Login
            setToken={setToken}
            goToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register goToLogin={() => setShowLogin(true)} />
        )}
      </>
    );
  }

  // 🔥 MAIN APP
  return (
    <div style={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          background: "#2c3e50",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>🚀 Task App</h2>

        <div onClick={() => setPage("dashboard")} style={menuStyle}>Dashboard</div>
        <div onClick={() => setPage("projects")} style={menuStyle}>Projects</div>
        <div onClick={() => setPage("users")} style={menuStyle}>Users</div>
        <div onClick={() => setPage("tasks")} style={menuStyle}>Tasks</div>
        <div onClick={() => setPage("kanban")} style={menuStyle}>Kanban</div>
        <div onClick={() => setPage("logs")} style={menuStyle}>Activity Logs</div>

        {/* 🔥 LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
            setShowLogin(true); // 🔥 important
          }}
          style={{
            marginTop: "20px",
            background: "red",
            color: "#fff",
            border: "none",
            padding: "10px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px", background: "#f4f6f8" }}>
        
        {/* NAVBAR */}
        <div
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h2>{page.toUpperCase()}</h2>
        </div>

        {/* ROUTES */}
        {page === "dashboard" && <Dashboard />}
        {page === "projects" && <ProjectList />}
        {page === "users" && <UserList />}
        {page === "tasks" && <TaskList />}
        {page === "kanban" && <KanbanBoard />}
        {page === "logs" && <ActivityLog />}
      </div>
    </div>
  );
}

const menuStyle = {
  cursor: "pointer",
  margin: "10px 0",
};

export default App;
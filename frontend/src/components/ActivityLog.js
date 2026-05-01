import React, { useEffect, useState } from "react";
import { getLogs } from "../services/api";

function ActivityLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const res = await getLogs();
    setLogs(res.data);
  };

  return (
  <div>
    <h2>Activity Logs</h2>

    <ul style={{ listStyle: "none", padding: 0 }}>
      {logs.map((log) => (
        <li
          key={log.id}
          style={{
            background: "#f5f5f5",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          {/* 🔥 Action */}
          <div style={{ fontWeight: "bold" }}>
            🟢 {log.action}
          </div>

          {/* 🔥 Time */}
          <div style={{ fontSize: "12px", color: "gray" }}>
            {new Date(log.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default ActivityLog;
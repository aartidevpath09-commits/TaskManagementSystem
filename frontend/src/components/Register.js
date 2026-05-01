import React, { useState } from "react";
import { registerUser } from "../services/api";

function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({ name, email, password });
      alert("Registered successfully");
      goToLogin(); // 🔥 switch to login
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>📝 Register</h2>

        <input
          placeholder="Name"
          style={input}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          style={input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btn} onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have account?{" "}
          <span style={link} onClick={goToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f8",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  width: "300px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "green",
  color: "#fff",
  border: "none",
};

const link = {
  color: "blue",
  cursor: "pointer",
};

export default Register;
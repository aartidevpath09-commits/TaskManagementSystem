import React, { useState } from "react";
import { loginUser } from "../services/api";

function Login({ setToken, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>🔐 Login</h2>

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

        <button style={btn} onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have account?{" "}
          <span style={link} onClick={goToRegister}>
            Register
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
  background: "#007bff",
  color: "#fff",
  border: "none",
};

const link = {
  color: "blue",
  cursor: "pointer",
};

export default Login;
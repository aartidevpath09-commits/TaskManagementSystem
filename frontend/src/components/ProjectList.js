import React, { useEffect, useState } from "react";
import { getProjects, createProject } from "../services/api";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  const handleSubmit = async () => {
    await createProject({ name, description });
    loadProjects();
  };

  return (
    <div>
      <h2>Projects</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name} - {p.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
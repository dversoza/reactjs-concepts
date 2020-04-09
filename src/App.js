import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState([]);
 
  async function listRepositories() {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  useEffect(()=>{
    listRepositories();
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title,
    })
    setTitle("");
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoriesUpdt = repositories.filter(repository => repository.id !== id);
    setRepositories(repositoriesUpdt);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileComponent = () => {
  const [user, setUser] = useState({
    username: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/users/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => setUser(response.data))
      .catch(error => setMessage('Erro ao carregar perfil: ' + error.response.data.error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put('/api/users/profile', user, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => setMessage('Perfil atualizado com sucesso!'))
      .catch(error => setMessage('Erro ao atualizar perfil: ' + error.response.data.error));
  };

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Nome de usuário"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Atualizar Perfil</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserProfileComponent;

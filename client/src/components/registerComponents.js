import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/register', formData)
      .then(response => {
        alert('Usuário registrado com sucesso!');
        setFormData({ username: '', password: '' });
      })
      .catch(error => console.error('Erro ao registrar usuário:', error));
  };

  return (
    <div>
      <h2>Criação de Conta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nome de usuário"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterComponent;

import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.username) errors.username = 'Nome de usuário é obrigatório';
    if (!formData.password) errors.password = 'Senha é obrigatória';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
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
        {errors.username && <span>{errors.username}</span>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
          required
        />
        {errors.password && <span>{errors.password}</span>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterComponent;

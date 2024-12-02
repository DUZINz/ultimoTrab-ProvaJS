import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/forgot', { email })
      .then(response => setMessage('Email de recuperação enviado com sucesso!'))
      .catch(error => setMessage('Erro ao enviar email de recuperação: ' + error.response.data.error));
  };

  return (
    <div>
      <h2>Recuperar Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Enviar Email de Recuperação</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordComponent;

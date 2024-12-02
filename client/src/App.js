import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ProductComponent from './components/productComponent';
import LoginComponent from './components/loginComponent'; // Adicione esta linha
import RegisterComponent from './components/registerComponent'; 
import UserProfileComponent from './components/userProfileComponent';

function App() {
  const [page, setPage] = useState('login');
  const renderPage = () => { 
    switch (page) { 
      case 'login': 
      return <LoginComponent />; 
    case 'register':
       return <RegisterComponent />; 
       case 'products': 
       return <ProductComponent />; 
       case 'profile': 
       return <UserProfileComponent />; 
       default: return <LoginComponent />; } };
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />  
        <h1>Meu Aplicativo de Produtos</h1>
        <nav> <button onClick={() => setPage('login')}>Login</button> 
        <button onClick={() => setPage('register')}>Registrar</button> 
        <button onClick={() => setPage('products')}>Produtos</button> 
        <button onClick={() => setPage('profile')}>Perfil</button> 
        </nav>
      </header>
      <main>
      {renderPage()}
      </main>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React from 'react';
import ProductComponent from './components/productComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Meu Aplicativo de Produtos</h1>
      </header>
      <main>
        <ProductComponent />
      </main>
    </div>
  );
}

export default App;

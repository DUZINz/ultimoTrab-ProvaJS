import './App.css';
import React from 'react';
import ProductComponent from './components/productComponent';
import LoginComponent from './components/loginComponent'; 
import RegisterComponent from './components/registerComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Aplicativo de Produtos</h1>
      </header>
      <main>
      <Switch> 
        <Route path="/login" component={LoginComponent} /> 
        <Route path="/register" component={RegisterComponent} /> 
        <Route path="/products" component={ProductComponent} /> 
      </Switch>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro ao carregar produtos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('/api/products', formData, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        setProducts([...products, response.data]);
        setFormData({ name: '', price: '', description: '' });
      })
      .catch(error => console.error('Erro ao cadastrar produto:', error));
  };

  return (
    <div>
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome do produto"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Preço"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          required
        />
        <button type="submit">Cadastrar Produto</button>
      </form>

      <h2>Produtos Cadastrados</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Preço: R${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const sequelize = require('./config/database');
const indexRouter = require('./routes/index'); // Para a rota principal do app
const usersRouter = require('./routes/users'); // Para a rota users ./routes/users.js

// Ativa a API com o Express
var app = express();

// Configurações do middleware
app.use(logger('dev'));
app.use(express.json()); // Permite o uso de JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas principais
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Rotas dos módulos de produtos, cesta de compras e pagamento
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', paymentRoutes);

// Sincroniza modelos com o banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.log('Error syncing database:', error);
});

// Sincronização do banco de dados (em dev)
const db = require('./models');

async function applyDataStructure() {
    await db.sequelize.sync({ alter: true });
}

applyDataStructure();

// Iniciar o servidor com o app.js na porta 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


module.exports = app;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const membrosRoutes = require('./routes/membros');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/membros', membrosRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
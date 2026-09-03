const express = require('express');
const router = express.Router();
const membros = require('../data/membros.json');

// Listar todos os membros
router.get('/', (req, res) => {
    res.json({ status: 'success', data: membros });
});

// Buscar um membro específico
router.get('/:id', (req, res) => {
    const membro = membros.find(m => m.id === parseInt(req.params.id));
    if (!membro) {
        return res.status(404).json({ status: 'error', message: 'Membro não encontrado' });
    }
    res.json({ status: 'success', data: membro });
});

// Criar um novo membro
router.post('/', (req, res) => {
    const { nome, email, telefone } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ status: 'error', message: 'Nome e email são obrigatórios' });
    }
    const novoMembro = {
        id: membros.length + 1,
        nome,
        email,
        telefone: telefone || '',
        dataCadastro: new Date().toISOString(),
    };
    membros.push(novoMembro);
    res.status(201).json({ status: 'success', data: novoMembro });
});

// Atualizar informações de um membro
router.put('/:id', (req, res) => {
    const membro = membros.find(m => m.id === parseInt(req.params.id));
    if (!membro) {
        return res.status(404).json({ status: 'error', message: 'Membro não encontrado' });
    }
    const { nome, email, telefone } = req.body;
    membro.nome = nome || membro.nome;
    membro.email = email || membro.email;
    membro.telefone = telefone || membro.telefone;
    res.json({ status: 'success', data: membro });
});

// Deletar um membro
router.delete('/:id', (req, res) => {
    const index = membros.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'Membro não encontrado' });
    }
    membros.splice(index, 1);
    res.json({ status: 'success', message: 'Membro deletado com sucesso' });
});

module.exports = router;
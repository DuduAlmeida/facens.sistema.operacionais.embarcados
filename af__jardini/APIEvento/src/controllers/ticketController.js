// controllers/ticketController.js
const Ticket = require('../models/ticketModel');

// Listar todos os ingressos
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os ingressos.' });
    }
};

// POST para adicionar um novo Ingresso
const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar o ingresso.' });
    }
};

// PUT para atualizar um ingresso
const updateTicket = async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({ error: 'Ingresso não encontrado.' });
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar o ingresso.' });
    }
};

// DELETE para deletar um ingresso
const deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.ticketId);
        if (!deletedTicket) {
            return res.status(404).json({ error: 'Ingresso não encontrado.' });
        }
        res.status(200).json({ message: 'Ingresso deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Falha ao deletar o ingresso.' });
    }
};

module.exports = {
    getAllTickets,
    createTicket,
    updateTicket,
    deleteTicket
};

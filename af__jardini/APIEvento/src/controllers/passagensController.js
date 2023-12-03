// controllers/passagensController.js
const Passagens = require('../models/passagensModel');

// Listar todas as reservas
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Passagens.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Erro ao buscar as reservas:', error.message);
        res.status(500).json({ error: 'Erro ao buscar as reservas.' });
    }
};

// Buscar reserva por ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Passagens.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error('Erro ao buscar a reserva:', error.message);
        res.status(500).json({ error: 'Erro ao buscar a reserva.' });
    }
};

// POST para adicionar uma nova reserva
const createBooking = async (req, res) => {
    try {
        const newBooking = new Passagens(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar a reserva.' });
    }
};

// PUT para atualizar uma reserva
const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Passagens.findByIdAndUpdate(req.params.bookingId, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar a reserva.' });
    }
};

// DELETE para deletar uma reserva
const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Passagens.findByIdAndDelete(req.params.bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
        res.status(200).json({ message: 'Reserva deletada com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Falha ao deletar a reserva.' });
    }
};

module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};

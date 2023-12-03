const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/passagensController');

// Rota para reservar uma passagem
router.post('/', ticketController.createBooking);

// Rota para obter todas as passagens
router.get('/', ticketController.getAllBookings);

// Rota para obter uma passagem específica pelo ID
router.get('/:bookingId', ticketController.getBookingById);

// Rota para atualizar uma passagem pelo ID
router.put('/:bookingId', ticketController.updateBooking);

// Rota para cancelar uma passagem pelo ID
router.delete('/:id', ticketController.deleteBooking);

// Aqui você também pode adicionar rotas para gerenciar voos, se necessário

module.exports = router;

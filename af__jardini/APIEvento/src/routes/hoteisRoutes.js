const express = require('express');
const router = express.Router();
const hoteis = require('../controllers/hoteisController')

// Rota para criar um novo hotel
router.post('/', hoteis.createHotel);

// Rota para obter todos os hotéis
router.get('/', hoteis.getAllHotels);

// Rota para obter um hotel específico pelo ID
router.get('/:hotelId', hoteis.getHotelById);

// Rota para atualizar um hotel pelo ID
router.put('/:hotelId', hoteis.updateHotel);

// Rota para deletar um hotel pelo ID
router.delete('/:hotelId', hoteis.deleteHotel);

module.exports = router;

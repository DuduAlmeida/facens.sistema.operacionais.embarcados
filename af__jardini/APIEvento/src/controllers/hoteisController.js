// controllers/hotelController.js
const Hotel = require('../models/hoteisModel');

const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os hotéis.' });
    }
};

const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel não encontrado.' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o hotel.' });
    }
};

const createHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar o hotel.' });
    }
};

const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.hotelId, req.body, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ error: 'Hotel não encontrado.' });
        }
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar o hotel.' });
    }
};

const deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.hotelId);
        if (!deletedHotel) {
            return res.status(404).json({ error: 'Hotel não encontrado.' });
        }
        res.status(200).json({ message: 'Hotel deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Falha ao deletar o hotel.' });
    }
};

module.exports = {
    getAllHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
};

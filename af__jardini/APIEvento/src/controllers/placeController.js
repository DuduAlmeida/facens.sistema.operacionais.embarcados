// controllers/placeController.js
const Place = require('../models/placeModel');

// Listar todos os lugares
const getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os lugares.' });
    }
};

// POST para adicionar um novo Lugar
const createPlace = async (req, res) => {
    try {
        const place = new Place(req.body);
        await place.save();
        res.status(201).json(place);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar o lugar.' });
    }
};

// PUT para atualizar um lugar
const updatePlace = async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.placeId, req.body, { new: true });
        if (!updatedPlace) {
            return res.status(404).json({ error: 'Lugar não encontrado.' });
        }
        res.status(200).json(updatedPlace);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar o lugar.' });
    }
};

// DELETE para deletar um lugar
const deletePlace = async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.placeId);
        if (!deletedPlace) {
            return res.status(404).json({ error: 'Lugar não encontrado.' });
        }
        res.status(200).json({ message: 'Lugar deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Falha ao deletar o lugar.' });
    }
};

module.exports = {
    getAllPlaces,
    createPlace,
    updatePlace,
    deletePlace
};

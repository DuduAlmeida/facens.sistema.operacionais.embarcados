const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    quartos: [{
        tipo: {
            type: String,
            enum: ['Simples', 'Duplo', 'Twin'],
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    categoria: {
        type: String,
        enum: ['Barato', 'Econômico', 'Luxo'],
        required: true
    },
    localizacao: {
        type: String,
        required: true
    },
    comodidades: {
        type: [String], // Lista de comodidades oferecidas pelo hotel (ex: Wi-Fi, piscina, academia)
        default: []
    },
    descricao: {
        type: String
    }
});

module.exports = mongoose.model('Hotel', hotelSchema);

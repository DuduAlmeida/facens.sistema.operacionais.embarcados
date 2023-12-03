const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Disponível', 'Ocupado'],
        required: true
    }
});

module.exports = mongoose.model('Place', placeSchema);

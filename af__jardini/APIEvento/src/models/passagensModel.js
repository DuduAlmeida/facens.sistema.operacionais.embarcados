const mongoose = require('mongoose');

const flightBookingSchema = new mongoose.Schema({
    passenger: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: false
    },
    outboundFlight: {
        type: String,
        required: false
    },
    returnFlight: {
        type: String,
        required: false
    },
    seatOnOutbound: {
        type: String,
        required: false
    },
    seatOnReturn: {
        type: String,
        required: false
    },
    valor: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Passagens', flightBookingSchema);

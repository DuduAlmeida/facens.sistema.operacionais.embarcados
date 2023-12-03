// controllers/eventController.js
const Event = require('../models/eventModel');
const Place = require('../models/placeModel');
const Ticket = require('../models/ticketModel');

// Listar todos os eventos
const getAllEventsWithAvailability = async (req, res) => {
    try {
        const events = await Event.find();

        // Para cada evento, obtenha os lugares disponíveis
        const eventsWithAvailability = await Promise.all(events.map(async (event) => {
            try {
                const places = await Place.find({ eventId: event._id });
                const tickets = await Ticket.find({ eventId: event._id, quantityAvailable: { $gte: 1 } });

                return {
                    _id: event._id,
                    name: event.name,
                    type: event.type,
                    date: event.date,
                    location: event.location,
                    description: event.description,
                    places: places.map(place => ({ Id: place.id ,description: place.description, status: place.status })),
                    tickets: tickets.map(ticket => ({ Id: ticket.id, type: ticket.type, price: ticket.price, quantityAvailable: ticket.quantityAvailable }))
                };
            } catch (error) {
                console.error('Erro ao buscar lugares e ingressos para o evento:', error.message);
                throw error;
            }
        }));

        res.status(200).json(eventsWithAvailability);
    } catch (error) {
        console.error('Erro ao buscar os eventos:', error.message);
        res.status(500).json({ error: 'Erro ao buscar os eventos.' });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }

        // Busca os lugares disponíveis para esse evento
        const places = await Place.find({ eventId: event._id});
        const tickets = await Ticket.find({ eventId: event._id, quantityAvailable: { $gte: 1 } });

        const eventData = {
            _id: event._id,
            name: event.name,
            type: event.type,
            date: event.date,
            location: event.location,
            description: event.description,
            places: places.map(place => ({ Id: place.id ,description: place.description, status: place.status })),
            tickets: tickets.map(ticket => ({ Id: ticket.id, type: ticket.type, price: ticket.price, quantityAvailable: ticket.quantityAvailable }))
        };

        res.status(200).json(eventData);
    } catch (error) {
        console.error('Erro ao buscar o evento:', error.message);
        res.status(500).json({ error: 'Erro ao buscar o evento.' });
    }
};


// POST para adicionar um novo Evento
const createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar o evento.' });
    }
};

// PUT para atualizar um evento
const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar o evento.' });
    }
};

// DELETE para deletar um evento
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        res.status(200).json({ message: 'Evento deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Falha ao deletar o evento.' });
    }
};

module.exports = {
    getAllEventsWithAvailability,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById
};

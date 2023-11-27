import express from 'express'
import { createUser } from './controllers/register'
import { login } from './controllers/authenticate'
import { listFlights } from './controllers/list-flights'
import { listFlightSeats } from './controllers/list-flight-seats'
import { listAvailableFlightTickets } from './controllers/list-available-flight-tickets'
import { checkUserAuth } from './middleware/auth'
import { listPlaces } from './controllers/list-places'
import { listFlightsByBoardingAndDestination } from './controllers/list-flights-by-boarding-and-destination'
import { bookTicket } from './controllers/book-ticket'
import { listBookedTicketsByUser } from './controllers/list-booked-tickets-by-user'
import { cancelTicket } from './controllers/cancel-ticket'

const router = express.Router()

router.post('/user', createUser)
router.post('/login', login)

router.get('/places', checkUserAuth, listPlaces)

router.get('/flights', checkUserAuth, listFlights)
router.post('/flights/locations', checkUserAuth, listFlightsByBoardingAndDestination)

router.get('/seats/flight/:flightId', checkUserAuth, listFlightSeats)

router.get('/tickets/flight/:flightId', listAvailableFlightTickets)
router.get('/tickets/user/:userId', checkUserAuth, listBookedTicketsByUser)
router.put('/tickets/book/:ticketId', checkUserAuth, bookTicket)
router.put('/tickets/cancel/:ticketId', checkUserAuth, cancelTicket)

export default router
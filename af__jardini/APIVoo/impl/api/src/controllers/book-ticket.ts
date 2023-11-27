import { SqliteTicketsRepository } from "../repositories/sqlite/sqlite-tickets-repository"
import { BookTicketUseCase } from "../use-cases/book-ticket-use-case"

export async function bookTicket(req, res) {
  try {
    const { ticketId } = req.params
    const { seatId } = req.body
    const userId = req.headers['user-id']

    const ticketRepository = new SqliteTicketsRepository()
    const bookTicketUseCase = new BookTicketUseCase(ticketRepository)

    const bookedTicket = await bookTicketUseCase.execute(Number(ticketId), seatId, userId)

    return res.status(200).json({ bookedTicket })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
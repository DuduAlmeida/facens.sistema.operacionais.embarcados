import { SqliteTicketsRepository } from "../repositories/sqlite/sqlite-tickets-repository";
import { ListAvailableFlightTicketsUseCase } from "../use-cases/list-available-flight-tickets-use-case";
import { ListBookedTicketsByUserUseCase } from "../use-cases/list-booked-tickets-by-user-use-case";

export async function listBookedTicketsByUser(req, res) {
  try {
    const { userId } = req.params

    const ticketsRepository = new SqliteTicketsRepository()
    const listBookedTicketsByUserUseCase = new ListBookedTicketsByUserUseCase(ticketsRepository)

    const bookedTickets = await listBookedTicketsByUserUseCase.execute(userId)

    return res.status(200).json({ bookedTickets })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
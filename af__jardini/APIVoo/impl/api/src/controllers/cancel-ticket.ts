import { SqliteTicketsRepository } from "../repositories/sqlite/sqlite-tickets-repository"
import { CancelTicketUseCase } from "../use-cases/cancel-ticket-use-case"

export async function cancelTicket(req, res) {
  try {
    const { ticketId } = req.params

    const ticketRepository = new SqliteTicketsRepository()
    const cancelTicketUseCase = new CancelTicketUseCase(ticketRepository)

    const canceledTicket = await cancelTicketUseCase.execute(Number(ticketId))

    return res.status(200).json({ canceledTicket })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
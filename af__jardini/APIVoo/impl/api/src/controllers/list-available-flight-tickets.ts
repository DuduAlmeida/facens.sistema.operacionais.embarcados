import { SqliteTicketsRepository } from "../repositories/sqlite/sqlite-tickets-repository";
import { ListAvailableFlightTicketsUseCase } from "../use-cases/list-available-flight-tickets-use-case";

export async function listAvailableFlightTickets(req, res) {
  try {
    const { flightId } = req.params

    const ticketsRepository = new SqliteTicketsRepository()
    const listAvailableFlightTicketsUseCase = new ListAvailableFlightTicketsUseCase(ticketsRepository)

    const availableTickets = await listAvailableFlightTicketsUseCase.execute(Number(flightId))

    return res.status(200).json({ availableTickets })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
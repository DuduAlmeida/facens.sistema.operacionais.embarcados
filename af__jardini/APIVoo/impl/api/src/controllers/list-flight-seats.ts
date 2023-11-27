import { SqliteSeatsRepository } from "../repositories/sqlite/sqlite-seats-repository"
import { ListFlightSeatsUseCase } from "../use-cases/list-flight-seats-use-case"

export async function listFlightSeats(req, res) {
  try {
    const { flightId } = req.params

    const seatsRepository = new SqliteSeatsRepository()
    const listFlightSeatsUseCase = new ListFlightSeatsUseCase(seatsRepository)

    const seats = await listFlightSeatsUseCase.execute(Number(flightId))

    return res.status(200).json({ seats })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
import { SqliteFlightsRepository } from "../repositories/sqlite/sqlite-flights-repository"
import { ListFlightsUseCase } from "../use-cases/list-flights-use-case"

export async function listFlights(req, res) {
  try {
    const flightsRepository = new SqliteFlightsRepository()
    const listFlightsUseCase = new ListFlightsUseCase(flightsRepository)

    const flights = await listFlightsUseCase.execute()

    return res.status(200).json({ flights })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
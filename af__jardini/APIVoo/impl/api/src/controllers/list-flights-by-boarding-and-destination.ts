import { SqliteFlightsRepository } from "../repositories/sqlite/sqlite-flights-repository"
import { ListFlightsByBoardingAndDestinationUseCase } from "../use-cases/list-flights-by-boarding-and-destination-use-case"

export async function listFlightsByBoardingAndDestination(req, res) {
  try {
    const { boardingId, destinationId } = req.body

    const flightsRepository = new SqliteFlightsRepository()
    const listFlightsByBoardingAndDestinationUseCase = new ListFlightsByBoardingAndDestinationUseCase(flightsRepository)

    const flights = await listFlightsByBoardingAndDestinationUseCase.execute(boardingId, destinationId)

    return res.status(200).json({ flights })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
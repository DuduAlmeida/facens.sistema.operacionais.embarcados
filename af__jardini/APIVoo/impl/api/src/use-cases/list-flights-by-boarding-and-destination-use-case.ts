import { FlightsRepository } from "../repositories/flights-repository";

export class ListFlightsByBoardingAndDestinationUseCase {
  private flightsRepository: FlightsRepository

  constructor(flightsRepository: FlightsRepository) {
    this.flightsRepository = flightsRepository
  }

  async execute(boardingId: number, destinationId: number) {
    if (!boardingId || !destinationId) {
      throw new Error("Não foram informados os campos necessários")
    }

    const flights = await this.flightsRepository.getFlightsByBoardingIdAndDestinationId(boardingId, destinationId)

    return flights
  }
}
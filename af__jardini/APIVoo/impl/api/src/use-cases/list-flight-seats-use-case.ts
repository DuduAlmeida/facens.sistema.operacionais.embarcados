import { SeatsRepository } from "../repositories/seats-repository";

export class ListFlightSeatsUseCase {
  private seatsRepository: SeatsRepository

  constructor(seatsRepository: SeatsRepository) {
    this.seatsRepository = seatsRepository
  }

  async execute(id: number) {
    const seats = await this.seatsRepository.findByFlightId(id)

    if ((seats && seats.length === 0) || !seats) {
      throw Error('Não foram econtrados assentos nesse voo.')
    }

    return seats
  }
}
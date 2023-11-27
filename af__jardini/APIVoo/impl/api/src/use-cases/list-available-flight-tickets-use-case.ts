import { TicketsRepository } from "../repositories/tickets-repository";

export class ListAvailableFlightTicketsUseCase {
  private ticketsRepository: TicketsRepository

  constructor(ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute(id: number) {
    const availableTickets = await this.ticketsRepository.findAvailableTicketsByFlightId(id)

    if(availableTickets && availableTickets.length === 0) {
      throw new Error('Não há passagens disponíveis para esse voo')
    }

    return availableTickets
  }
}
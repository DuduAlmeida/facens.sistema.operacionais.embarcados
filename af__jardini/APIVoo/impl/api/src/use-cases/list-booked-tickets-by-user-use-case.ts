import { TicketsRepository } from "../repositories/tickets-repository";

export class ListBookedTicketsByUserUseCase {
  private ticketsRepository: TicketsRepository

  constructor(ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute(id: number) {
    const bookedTickets = await this.ticketsRepository.findBookedTicketsByUserId(id)

    return bookedTickets
  }
}
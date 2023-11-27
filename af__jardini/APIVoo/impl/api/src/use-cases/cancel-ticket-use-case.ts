import { TicketsRepository } from "../repositories/tickets-repository";

export class CancelTicketUseCase {
  private ticketsRepository: TicketsRepository;

  constructor(ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute(id: number) {
    const ticket = await this.ticketsRepository.findById(id)

    if (!ticket) {
      throw new Error('Esta passagem não existe')
    } else if (ticket && ticket.booked === 0) {
      throw new Error('Esta passagem já está cancelada')
    }

    const canceledTicket = await this.ticketsRepository.cancelTicketById(id)

    if (!canceledTicket) {
      throw new Error('Erro ao cancelar passagem')
    }

    return canceledTicket
  }
}
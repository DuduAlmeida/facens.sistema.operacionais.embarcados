import { TicketsRepository } from "../repositories/tickets-repository";

export class BookTicketUseCase {
  private ticketsRepository: TicketsRepository;

  constructor(ticketsRepository: TicketsRepository) {
    this.ticketsRepository = ticketsRepository
  }

  async execute(id: number, seatId: number, userId: number) {
    const ticket = await this.ticketsRepository.findById(id)
    
    if(!ticket) {
      throw new Error('Esta passagem não existe')
    } else if(ticket && ticket.booked === 1) {
      throw new Error('Esta passagem já está reservada')
    }

    const bookedTicket = await this.ticketsRepository.bookTicketById(id, seatId, userId)

    if(!bookedTicket) {
      throw new Error('Erro ao reservar passagem')
    }

    return bookedTicket
  }
}
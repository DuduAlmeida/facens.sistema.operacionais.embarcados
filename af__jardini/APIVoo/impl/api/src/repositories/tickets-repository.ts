export interface TicketsRepository {
  findById(id: number): Promise<Ticket | null>
  findTickets(): Promise<Ticket[] | null>
  findAvailableTickets(): Promise<Ticket[] | null>
  findByFlightId(id: number): Promise<Ticket[] | null>
  findAvailableTicketsByFlightId(id: number): Promise<Ticket[] | null>
  findBookedTicketsByUserId(id: number): Promise<Ticket[] | null>
  bookTicketById(id: number, seatId: number, userId: number): Promise<Ticket | null>
  cancelTicketById(id: number): Promise<Ticket | null>
}
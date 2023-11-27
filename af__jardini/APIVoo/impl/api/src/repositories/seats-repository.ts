export interface SeatsRepository {
  findById(id: number): Promise<Seat | null>
  findByFlightId(id: number): Promise<Seat[] | null>
  findByTicketId(id: number): Promise<Seat | null>
}
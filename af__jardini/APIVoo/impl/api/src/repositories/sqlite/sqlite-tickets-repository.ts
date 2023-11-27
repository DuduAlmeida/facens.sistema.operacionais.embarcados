import { openDB } from "../../database/db";
import { TicketsRepository } from "../tickets-repository";

export class SqliteTicketsRepository implements TicketsRepository {
  async findById(id: number): Promise<Ticket | null> {
    const db = await openDB()

    const ticket = await db.get('select * from ticket where id = ?', id)

    return ticket
  }
  async findTickets(): Promise<Ticket[] | null> {
    const db = await openDB()

    const tickets = await db.all('select * from ticket')

    return tickets
  }
  async findAvailableTickets(): Promise<Ticket[] | null> {
    const db = await openDB()

    const tickets = await db.all('select * from ticket where booked = false')

    return tickets
  }
  async findByFlightId(id: number): Promise<Ticket[] | null> {
    const db = await openDB()

    const tickets = await db.all('select * from ticket where flight_id = ?', id)

    return tickets
  }
  async findAvailableTicketsByFlightId(id: number): Promise<Ticket[] | null> {
    const db = await openDB()

    const tickets = await db.all('select * from ticket where booked = false and flight_id = ?', id)

    return tickets
  }
  async findBookedTicketsByUserId(id: number): Promise<Ticket[] | null> {
    const db = await openDB()

    const tickets = await db.all('select * from ticket where booked = true and booked_by = ?', id)

    return tickets
  }
  async bookTicketById(id: number, seatId: number, userId: number): Promise<Ticket | null> {
    const db = await openDB()

    await db.run('update ticket set booked = true, booked_by = ? where id = ?', [userId, id])
    await db.run('update seat set ticket_id = ? where id = ?', [id, seatId])
    // need to set ticket to this ticket

    const ticket = await db.get('select * from ticket where id = ?', id)

    return ticket
  }
  async cancelTicketById(id: number): Promise<Ticket | null> {
    const db = await openDB()

    await db.run('update ticket set booked = false, booked_by = ? where id = ?', [null, id])
    await db.run('update seat set ticket_id = ? where ticket_id = ?', [null, id])

    const ticket = await db.get('select * from ticket where id = ?', id)

    return ticket
  }
}
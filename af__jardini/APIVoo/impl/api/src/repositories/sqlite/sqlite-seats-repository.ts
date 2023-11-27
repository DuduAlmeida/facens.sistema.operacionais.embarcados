import { openDB } from "../../database/db"
import { SeatsRepository } from "../seats-repository"

export class SqliteSeatsRepository implements SeatsRepository {
  async findById(id: number): Promise<Seat | null> {
    const db = await openDB()

    const seat = db.get('select * from seat where id = ?', id)
    
    return seat
  }
  
  async findByFlightId(id: number): Promise<Seat[] | null> {
    const db = await openDB()

    const seats = await db.all('select * from seat where flight_id = ?', id)

    return seats
  }
  async findByTicketId(id: number): Promise<Seat | null> {
    const db = await openDB()

    const seat = db.get('select * from seat where ticket_id = ?', id)

    return seat
  }
}
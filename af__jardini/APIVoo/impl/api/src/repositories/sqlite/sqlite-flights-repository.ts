import { openDB } from "../../database/db";
import { FlightsRepository } from "../flights-repository";

export class SqliteFlightsRepository implements FlightsRepository {
  async getFlights(): Promise<Flight[] | null> {
    const db = await openDB()

    const flights = await db.all('select flight.id, flight.type, flight.boarding_location_id, flight.destination_id, p1.name as boarding_location, p2.name destination_location from flight inner join place p1 on boarding_location_id = p1.id inner join place p2 on destination_id = p2.id')

    return flights
  }
  async getFlightById(id: number): Promise<Flight | null> {
    const db = await openDB()
    
    const flight = await db.get('SELECT * FROM flight where id = ?', id)

    return flight
  }
  async getFlightsByBoardingIdAndDestinationId(boardingId: number, destinationId: number): Promise<Flight[] | null> {
    const db = await openDB()
    
    const flights = await db.all('select flight.id, flight.type, flight.boarding_location_id, flight.destination_id, p1.name as boarding_location, p2.name destination_location from flight inner join place p1 on boarding_location_id = p1.id inner join place p2 on destination_id = p2.id where boarding_location_id = ? and destination_id = ?', [boardingId, destinationId])

    return flights
  }
}
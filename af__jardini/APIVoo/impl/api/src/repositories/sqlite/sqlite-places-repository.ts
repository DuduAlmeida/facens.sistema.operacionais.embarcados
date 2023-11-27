import { openDB } from "../../database/db";
import { PlacesRepository } from "../places-repository";

export class SqlitePlacesRepository implements PlacesRepository {
  async findById(id: number): Promise<Place | null> {
    const db = await openDB()

    const place = await db.get('select * from place where id = ?', id)

    return place
  }
  async findPlaces(): Promise<Place[] | null> {
    const db = await openDB()

    const places = await db.all('select * from place')

    return places
  }

}
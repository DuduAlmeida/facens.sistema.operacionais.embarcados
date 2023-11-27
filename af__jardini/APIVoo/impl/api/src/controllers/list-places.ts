import { SqlitePlacesRepository } from "../repositories/sqlite/sqlite-places-repository"
import { ListPlacesUseCase } from "../use-cases/list-places-use-case"

export async function listPlaces(req, res) {
  try {
    const placesRepository = new SqlitePlacesRepository()
    const listPlacesUseCase = new ListPlacesUseCase(placesRepository)

    const places = await listPlacesUseCase.execute()

    return res.status(200).json({ places })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}
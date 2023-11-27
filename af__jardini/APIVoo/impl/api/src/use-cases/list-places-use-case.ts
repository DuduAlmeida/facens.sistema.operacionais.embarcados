import { PlacesRepository } from "../repositories/places-repository";

export class ListPlacesUseCase {
  private placesRepository: PlacesRepository

  constructor(placesRepository: PlacesRepository) {
    this.placesRepository = placesRepository
  }

  async execute() {
    const places = await this.placesRepository.findPlaces()

    if (places && places.length === 0) {
      throw new Error('Não foram encontrados pontos de embarque/destinos.')
    }

    return places
  }
}
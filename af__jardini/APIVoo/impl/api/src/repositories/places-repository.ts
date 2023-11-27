export interface PlacesRepository {
  findById(id: number): Promise<Place | null>
  findPlaces(): Promise<Place[] | null>
}
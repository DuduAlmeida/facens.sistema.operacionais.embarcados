export interface FlightsRepository {
  getFlights(): Promise<Flight[] | null>
  getFlightById(id: number): Promise<Flight | null>
  getFlightsByBoardingIdAndDestinationId (boardingId: number, destinationId: number): Promise<Flight[] | null>
}
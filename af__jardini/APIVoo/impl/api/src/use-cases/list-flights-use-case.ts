import { FlightsRepository } from "../repositories/flights-repository";

export class ListFlightsUseCase {
  private flightsRepository: FlightsRepository

  constructor(flightsRepository: FlightsRepository) {
    this.flightsRepository = flightsRepository
  }

  async execute() {
    const flights = await this.flightsRepository.getFlights()

    if ((flights && flights.length === 0) || !flights) {
      throw Error('Não foram econtrados voos.')
    }

    const mappedFlights = flights.reduce((acc: any, current) => {
      if (current.type === "IDA") {
        return {
          ...acc,
          outboundFlights: [...acc.outboundFlights, current]
        }
      } else {
        return {
          ...acc,
          returnFlights: [...acc.returnFlights, current]
        }
      }
    }, { outboundFlights: [], returnFlights: [] })

    return mappedFlights
  }
}
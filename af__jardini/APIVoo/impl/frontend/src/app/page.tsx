"use client"

import { useRouter } from 'next/navigation'
import { api } from "@/libs/axios"
import { FormEvent, useEffect, useRef, useState } from "react"

export default function Home() {
  const router = useRouter()

  const [placesData, setPlacesData] = useState<Place[]>([]);
  const [flightsData, setFlightsData] = useState<Flight[]>([])
  const [ticketsData, setTicketsData] = useState<Ticket[]>([])
  const [seatsData, setSeatsData] = useState<Seat[]>([])

  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const boardingInputRef = useRef<HTMLSelectElement>(null)
  const destinationInputRef = useRef<HTMLSelectElement>(null)
  const flightInputRef = useRef<HTMLSelectElement>(null)



  useEffect(() => {
    console.log(api.defaults.headers.common)

    if (!api.defaults.headers.common['user-id']) {
      router.replace('/signIn')
    }

    fetchPlaces()
  }, [])

  useEffect(() => {
    setTicketsData([])
    setSeatsData([])
  }, [flightsData])

  async function fetchPlaces() {
    const response = await api.get('/places')

    if (response.data) {
      setPlacesData(response.data.places)
    }
  }

  async function fetchFlights() {
    if (boardingInputRef.current && destinationInputRef.current) {
      const response = await api.post('/flights/locations', {
        boardingId: boardingInputRef.current.value,
        destinationId: destinationInputRef.current.value
      })

      if (response.data) {
        setFlightsData(response.data.flights)
      }
    }
  }

  async function fetchSeats() {
    if (flightInputRef.current) {
      const response = await api.get(`/seats/flight/${flightInputRef.current.value}`)

      if (response.data) {
        setSeatsData(response.data.seats)
      }
    }
  }

  async function fetchTickets() {
    if (flightInputRef.current) {
      const response = await api.get(`/tickets/flight/${flightInputRef.current.value}`)

      if (response.data) {
        setTicketsData(response.data.availableTickets)
      }
    }
  }

  async function bookTicket(event: FormEvent) {
    event.preventDefault()

    if (selectedSeat && ticketsData.length > 0) {
      const response = await api.put<{ bookedTicket: Ticket }>(`/tickets/book/${ticketsData[0].id}`, {
        seatId: selectedSeat.id
      })

      if (response.data.bookedTicket.booked === 1) {
        alert('Sucesso!')

        fetchSeats()
      }
    }
  }

  return (
    <main className="h-full flex items-center justify-center">
      <form
        onSubmit={bookTicket}
        className='text-lg flex flex-col gap-8'
      >
        {placesData && placesData.length > 0 && (
          <section className='flex flex-col items-center justify-center gap-8 border-2 rounded-md border-zinc-700 p-8'>
            <div className='flex items-center gap-8'>
              <div className='flex flex-col'>
                <label htmlFor='boardingSelect'>Local de Embarque:</label>
                <select
                  ref={boardingInputRef}
                  name="boardingSelect"
                  className='p-4 border-2 border-zinc-700 rounded-md'
                >
                  {placesData.map((place) => <option key={place.id} value={place.id}>{place.name}</option>)}
                </select>
              </div>
              <span> ... </span>
              <div className='flex flex-col'>
                <label htmlFor='destinationSelect'>Local de Destino:</label>
                <select
                  ref={destinationInputRef}
                  name="destinationSelect"
                  className='p-4 border-2 border-zinc-700 rounded-md '
                >
                  {placesData.map((place) => <option key={place.id} value={place.id}>{place.name}</option>)}
                </select>
              </div>
            </div>
            <button
              type='button'
              onClick={fetchFlights}
              className='bg-zinc-700 text-white w-48 p-2 rounded-md'
            >
              Procurar voos
            </button>
          </section>
        )}

        {flightsData && flightsData.length > 0 && (
          <section className='flex flex-col items-center justify-center  gap-8 border-2 rounded-md border-zinc-700 p-8'>
            <div className='flex flex-col'>
              <label htmlFor='flightSelect'>Voo:</label>
              <select
                ref={flightInputRef}
                name="flightSelect"
                className='p-4 border-2 border-zinc-700 rounded-md'
              >
                {flightsData.map((flight) => <option key={flight.id} value={flight.id}>{`${flight.boarding_location} -> ${flight.destination_location} (${flight.type})`}</option>)}
              </select>
            </div>
            <button
              type='button'
              onClick={fetchTickets}
              disabled={placesData.length === 0}
              className='bg-zinc-700 text-white w-48 p-2 rounded-md disabled:opacity-75'
            >
              Procurar Passagens
            </button>
          </section>
        )}

        {ticketsData && ticketsData.length > 0 && (
          <section className='flex flex-col items-center justify-center  gap-8 border-2 rounded-md border-zinc-700 p-8'>
            <p>Passagens disponíveis: {ticketsData.length}</p>
            <button
              type='button'
              onClick={fetchSeats}
              disabled={ticketsData.length === 0}
              className='bg-white-700 text-green-700 border-green-700 border-4 w-48 p-2 rounded-md disabled:opacity-75'
            >
              COMPRAR
            </button>
          </section>
        )}

        {seatsData && seatsData.length > 0 && (
          <section className='flex flex-col items-center justify-center  gap-8 border-2 rounded-md border-zinc-700 p-8'>
            <span className='text-sm'>cabine</span>
            <div className='grid grid-cols-2 gap-4 w-fit border-solid border-2 border-t-4 border-zinc-700 p-4'>
              {seatsData.map((seat) => (
                <button
                  key={seat.id}
                  type='button'
                  disabled={seat.ticket_id !== null}
                  onClick={() => setSelectedSeat(seat)}
                  className='bg-green-500 text-white h-8 w-8 disabled:bg-red-500'
                >
                  {seat.code}
                </button>
              ))}
            </div>

            {selectedSeat && <p>Assento escolhido: {selectedSeat.code}</p>}

            <button
              type='submit'
              disabled={!selectedSeat}
              className='bg-green-700 text-white w-48 p-2 rounded-md disabled:opacity-75'
            >
              Finalizar
            </button>
          </section>
        )}
      </form>
    </main>
  )
}

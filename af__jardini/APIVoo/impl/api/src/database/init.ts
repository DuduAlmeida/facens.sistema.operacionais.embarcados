import { openDB } from "./db";

export async function initDB() {
  const db = await openDB()

  await db.get("PRAGMA foreign_keys = ON")

  await db.run('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password_hash TEXT)');

  await db.run('CREATE TABLE IF NOT EXISTS place (id INTEGER PRIMARY KEY, name TEXT)')

  await db.run('CREATE TABLE IF NOT EXISTS flight (id INTEGER PRIMARY KEY, type TEXT CHECK( type IN (\'IDA\', \'IDA E VOLTA\')), boarding_location_id INTEGER, destination_id INTEGER, FOREIGN KEY (boarding_location_id) REFERENCES place, FOREIGN KEY (destination_id) REFERENCES place)')

  await db.run('CREATE TABLE IF NOT EXISTS seat (id INTEGER PRIMARY KEY, code TEXT, ticket_id INTEGER, flight_id INTEGER,  FOREIGN KEY (ticket_id) REFERENCES ticket, FOREIGN KEY (flight_id) REFERENCES flight)')

  await db.run('CREATE TABLE IF NOT EXISTS ticket (id INTEGER PRIMARY KEY, booked BOOLEAN, flight_id INTEGER, booked_by INTEGER, FOREIGN KEY (flight_id) REFERENCES flight, FOREIGN KEY (booked_by) REFERENCES user)')


  const existingUserRecords = await db.all('select * from user')

  if (existingUserRecords.length === 0) {
    await db.run('INSERT INTO user (username, email, password_hash) values(?, ?, ?)', ['user', 'user@email.com', '$2b$10$FOSVhIqa4NboOX/L8eyONOKKlpJbfhguQhgjmwWjMvGdij85Grlu.'])
  }

  const existingPlaceRecords = await db.all('select * from place where name in(?, ?, ?)', ['São paulo', 'Rio de Janeiro', 'Recife'])

  if (existingPlaceRecords.length === 0) {
    await db.run('INSERT INTO place (name) values(?)', 'São paulo')
    await db.run('INSERT INTO place (name) values(?)', 'Rio de Janeiro')
    await db.run('INSERT INTO place (name) values(?)', 'Recife')
  }

  const existingFlightRecords = await db.all('select * from flight')

  if (existingFlightRecords.length === 0) {
    await db.run('INSERT INTO flight (type, boarding_location_id, destination_id) values(?, ?, ?)', ['IDA', 1, 2])
    await db.run('INSERT INTO flight (type, boarding_location_id, destination_id) values(?, ?, ?)', ['IDA E VOLTA', 2, 1])

    await db.run('INSERT INTO flight (type, boarding_location_id, destination_id) values(?, ?, ?)', ['IDA', 1, 3])
    await db.run('INSERT INTO flight (type, boarding_location_id, destination_id) values(?, ?, ?)', ['IDA E VOLTA', 3, 1])

    await db.run('INSERT INTO flight (type, boarding_location_id, destination_id) values(?, ?, ?)', ['IDA', 2, 3])
    await db.run('INSERT INTO flight (type, boarding_location_id, destination_id) values(?, ?, ?)', ['IDA E VOLTA', 3, 2])
  }

  const existingSeatRecords = await db.all('select * from seat')

  if (existingSeatRecords.length === 0) {
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A1', null, 1])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A2', null, 1])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A3', null, 1])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A4', null, 1])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A5', null, 1])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A6', null, 1])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A7', null, 1])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A8', null, 1])

    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A1', null, 2])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A2', null, 2])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A3', null, 2])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A4', null, 2])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A5', null, 2])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A6', null, 2])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A7', null, 2])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A8', null, 2])

    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A1', null, 3])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A2', null, 3])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A3', null, 3])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A4', null, 3])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A5', null, 3])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A6', null, 3])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A7', null, 3])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A8', null, 3])

    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A1', null, 4])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A2', null, 4])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A3', null, 4])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A4', null, 4])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A5', null, 4])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A6', null, 4])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A7', null, 4])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A8', null, 4])

    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A1', null, 5])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A2', null, 5])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A3', null, 5])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A4', null, 5])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A5', null, 5])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A6', null, 5])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A7', null, 5])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A8', null, 5])

    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A1', null, 6])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A2', null, 6])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A3', null, 6])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A4', null, 6])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A5', null, 6])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A6', null, 6])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A7', null, 6])
    await db.run('INSERT INTO seat(code, ticket_id, flight_id) values(?, ?, ?)', ['A8', null, 6])
  }

  const existingTicketRecords = await db.all('select * from ticket')

  if (existingTicketRecords.length === 0) {
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 1, null])

    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 2, null])

    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 3, null])

    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 4, null])

    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 5, null])

    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
    await db.run('INSERT INTO ticket(booked, flight_id, booked_by) values(?, ?, ?)', [false, 6, null])
  }

  // const tables = await db.all("select name from sqlite_master where type='table'");

  // console.log({ tables })

  // const users = await db.all("select * from user")

  // console.log({ users })

  // const places = await db.all('select * from place')

  // console.log({ places })

  // const flights = await db.all('select * from flight')

  // console.log({ flights })

  // const tickets = await db.all('select * from ticket')

  // console.log({ tickets })

  // const seats = await db.all('select * from seat')

  // console.log({ seats })
}
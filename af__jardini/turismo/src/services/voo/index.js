import { USER_VOO_STORAGE } from "../../constants/storage";

const url_api = "http://localhost:3001";

/**
 * @param {{
 *  email: string,
 *  username: string,
 *  password: string,
 * }} body
 */
const registerUser = (payload) => {
  console.log(payload)
  fetch(`${url_api}/flightapp/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

/**
 * @param {{
 *  email: string,
 *  password: string,
 * }} body
 */
const login = (payload) => {
  fetch(`${url_api}/flightapp/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      storeUser(data?.user);
    })
    .catch((error) => console.error(error));
};

const storeUser = (user) => {
  if (!user) return;

  const userParsed = JSON.stringify(user);
  sessionStorage.setItem(USER_VOO_STORAGE, userParsed);
};

const getUserStored = () => {
  const userStringfied = sessionStorage.getItem(USER_VOO_STORAGE);

  if (!userStringfied) return {};

  return JSON.parse(userStringfied);
};

/**
 * @param {{
 *  email: string,
 *  password: string,
 * }} body
 */
const getFlights = (payload) => {
  const user = getUserStored();
  fetch(`${url_api}/flightapp/flights`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": user?.id,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

/**
 * @param {{
 *  ticketId: number,
 * }} body
 */
const getSeats = (payload) => {
  const user = getUserStored();
  fetch(`${url_api}/flightapp/seats/flight/${payload?.ticketId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": user?.id,
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

/**
 * @param {{
 *  ticket_id: string,
 *  seat_id: string,
 * }} body
 */
const reserveFlight = ({ ticket_id = -1, seat_id = -1 }) => {
  const user = getUserStored();
  fetch(`${url_api}/flightapp/tickets/book/${user?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "user-id": user?.id,
      ticketId: ticket_id,
    },
    body: JSON.stringify({
      seatId: seat_id,
    }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

export default {
  login,
  getSeats,
  getFlights,
  registerUser,
  reserveFlight,
};

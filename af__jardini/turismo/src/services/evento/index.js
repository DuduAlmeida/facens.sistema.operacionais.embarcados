const url_api = "http://localhost:3003";

const getEvent = () => {
  return fetch(`${url_api}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

export default {
  getEvent,
};

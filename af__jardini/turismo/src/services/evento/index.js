const url_api = "https://api-eventos-allexfelicio.vercel.app";

const getEvent = () => {
  fetch(`${url_api}/events}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

export default {
  getEvent,
};

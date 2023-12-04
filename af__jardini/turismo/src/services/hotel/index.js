const url_api = "http://localhost:4321";

/**
 * @param {{
 *  roomCategories: string[],
 *  category: string,
 * }} body
 */
const getHotels = (payload) => {
  let endpointUrl = `${url_api}/hotels?roomCategories=${
    payload?.roomCategories?.length > 0 ? payload?.roomCategories : ""
  }&category=${payload?.category || ""}&cpf=${payload?.cpf || ""}`;

  if (payload)
    return fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error));

  return async () => {};
};

export default {
  getHotels,
};

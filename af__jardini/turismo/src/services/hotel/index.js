const url_api = "";

/**
 * @param {{
 *  roomCategories: string[],
 *  category: string,
 * }} body
 */
const getHotels = (payload) => {
  let endpointUrl = `${url_api}/hotels?roomCategories=${
    payload?.roomCategories?.length > 0 ? payload?.roomCategories : ""
  }&category=${payload?.category || ""}`;

  if (payload)
    fetch(endpointUrl, {
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
  getHotels,
};

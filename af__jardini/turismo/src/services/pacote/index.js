const url_api = "http://localhost:4321";

/**
 * @param {{
 *  cpf: string[],
 * }} body
 */
const getMinePackages = (payload) => {
  let endpointUrl = `${url_api}/packages?cpf${payload?.cpf || ""}`;

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

/**
 * @param {{
 *  title: string,
 *  flyID: string,
 *  eventID: string,
 *  hotelID: string,
 * }} body
 */
const reservePackage = (payload) => {
  return fetch(`${url_api}/packages`, {
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
 *  id: string,
 * }} body
 */
const cancellPackage = ({ id }) => {
  return fetch(`${url_api}/packages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

export default {
  getMinePackages,
  cancellPackage,
  reservePackage,
};

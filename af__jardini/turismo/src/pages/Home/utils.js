export const defaultRecordByLocation = () => ({
  SP: [],
  RJ: [],
  BA: [],
  MG: [],
  RS: [],
  PE: [],
  CE: [],
});

export const getEventRecordByLocation = (list = []) => {
  const RECORD = { ...defaultRecordByLocation() };

  list.forEach((item) => {
    if (item?.location === "São Paulo") return RECORD.SP.push(item);
    if (item?.location === "Rio de Janeiro") return RECORD.RJ.push(item);
    if (item?.location === "Belo Horizonte") return RECORD.MG.push(item);
    if (item?.location === "Salvador") return RECORD.BA.push(item);
    if (item?.location === "Recife") return RECORD.PE.push(item);
    if (["Curitiba", "Porto Alegre"].includes(item?.location))
      return RECORD.RS.push(item);
  });

  return RECORD;
};

export const getHotelRecordByLocation = (list = []) => {
  const RECORD = { ...defaultRecordByLocation() };

  list.forEach((item) => {
    if (item?.address?.state === "SP") return RECORD.SP.push(item);
    if (item?.address?.state === "RJ") return RECORD.RJ.push(item);
    if (item?.address?.state === "BA") return RECORD.BA.push(item);
    if (item?.address?.state === "MG") return RECORD.MG.push(item);
    if (item?.address?.state === "CE") return RECORD.CE.push(item);
    if (item?.address?.state === "RS") return RECORD.RS.push(item);
  });

  return RECORD;
};

export const getFlyRecordByLocation = (list = []) => {
  const RECORD = { ...defaultRecordByLocation() };

  list.forEach((item) => {
    if (item?.destination_location === "São Paulo") return RECORD.SP.push(item);
    if (item?.destination_location === "Rio de Janeiro")
      return RECORD.RJ.push(item);
    if (item?.destination_location === "Belo Horizonte")
      return RECORD.MG.push(item);
    if (item?.destination_location === "Salvador") return RECORD.BA.push(item);
    if (item?.destination_location === "Recife") return RECORD.PE.push(item);
    if (["Curitiba", "Porto Alegre"].includes(item?.location))
      return RECORD.RS.push(item);
  });

  return RECORD;
};

export const getPackageList = ({
  fly: flyList = [],
  event: eventList = [],
  hotel: hotelList = [],
}) => {
  const flyRecord = getFlyRecordByLocation(flyList);
  const eventRecord = getEventRecordByLocation(eventList);
  const hotelRecord = getHotelRecordByLocation(hotelList);
  const package_list = [];

  Object.entries(flyRecord).forEach(([locationKey, flyList]) => {
    let fly_hotel_mixed = [];
    flyList = [flyList || []].flat();

    flyList.forEach((currentFly) => {
      const hotelListByLocation = hotelRecord[locationKey] || [];
      hotelListByLocation.forEach((hotel) => {
        fly_hotel_mixed.push({ hotel, fly: currentFly });
      });

      const eventListByLocation = eventRecord[locationKey] || [];
      eventListByLocation.forEach((event) => {
        fly_hotel_mixed.forEach(({ fly, hotel }) => {
          package_list.push({
            hotel,
            event,
            fly: currentFly,
            title: `${fly?.type} ${hotel?.address?.state} - ${event?.name} - ${hotel?.name}`,
          });
        });
      });
    });
  });

  return package_list;
};

export const getPackageHTMLDescription = (item = {}) => {
  return `Descrição do combo: <br />
  <p>
    Hotel: ${item?.hotel?.name} ${item?.hotel?.category}
  </p>
  <p>
    Voo: ${item?.fly?.type} - de ${item?.fly?.boarding_location} para ${item?.fly?.destination_location}
  </p>
  <p>
    Evento: ${item?.event?.type} - ${item?.event?.name}
  </p>`;
};

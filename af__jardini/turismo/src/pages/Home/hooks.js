import { useEffect, useRef, useState } from "react";

import services from "../../services";

export const useHome = () => {
  const fetchedItems = useRef({ hotel: [], fly: [], event: [] });
  const [hasFetchedHotels, setHasFetchedHotels] = useState(false);
  const [hasFetchedFlies, setHasFetchedFlies] = useState(false);
  const [hasFetchedEvents, setHasFetchedEvents] = useState(false);
  const [packages, setPackages] = useState({ isLoading: true, list: [] });

  const fetchHotels = () => {
    services.hotel
      .getHotels({})
      .then((data) => {
        if (!!data?.data && Array.isArray(data?.data))
          fetchedItems.current.hotel = data?.data;
        setHasFetchedHotels(true);
      })
      .catch((error) => {
        console.log(error); // Exibe qualquer erro ocorrido na requisição no console
        setHasFetchedHotels(true);
      });
  };

  const fetchFlies = () => {
    services.voo
      .getFlights({})
      .then((data) => {
        if (!!data?.data && Array.isArray(data?.data))
          fetchedItems.current.fly = data?.data;
        setHasFetchedFlies(true);
      })
      .catch((error) => {
        console.log(error); // Exibe qualquer erro ocorrido na requisição no console
        setHasFetchedFlies(true);
      });
  };

  const fetchEvents = () => {
    services.evento
      .getEvent({})
      .then((data) => {
        if (!!data?.data && Array.isArray(data?.data))
          fetchedItems.current.event = data?.data;
        setHasFetchedEvents(true);
      })
      .catch((error) => {
        console.log(error); // Exibe qualquer erro ocorrido na requisição no console
        setHasFetchedEvents(true);
      });
  };

  const preparePackages = () => {
    const {
      fly: flyList,
      event: eventList,
      hotel: hotelList,
    } = fetchedItems.current;

    //TODO: CREATE RECORD LIST BY LOCATION

    console.log("prepare", flyList, eventList, hotelList);
  };

  useEffect(() => {
    fetchHotels();
    fetchFlies();
    fetchEvents();
  }, []);

  useEffect(() => {
    const hadFetchedAllAPIS =
      hasFetchedHotels && hasFetchedFlies && hasFetchedEvents;

    if (hadFetchedAllAPIS) {
      const hasAllLists =
        !!fetchedItems.current.event?.length &&
        !!fetchedItems.current.fly?.length &&
        !!fetchedItems.current.hotel?.length;

      if (hasAllLists) {
        preparePackages();
      } else {
        setPackages({ isLoading: false, list: [] });
      }
    }
  }, [hasFetchedHotels, hasFetchedFlies, hasFetchedEvents]);

  return {
    packages,
    fetchedItems,
    hasFetchedHotels,
  };
};

import { useEffect, useRef, useState } from "react";

import services from "../../services";

export const useHome = () => {
  const fetchedItems = useRef({ hotel: [], fly: [], event: [] });
  const [hasFetchedHotels, setHasFetchedHotels] = useState(false);
  const [hasFetchedFlies, setHasFetchedFlies] = useState(false);
  const [hasFetchedEvents, setHasFetchedEvents] = useState(false);
  const packages = useState({ isLoading: true, list: [] });

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
    fetch("http://localhost:4321/hotels")
      .then((response) => response.json())
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
    fetch("http://localhost:4321/hotels")
      .then((response) => response.json())
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

  useEffect(() => {
    fetchHotels();
    fetchFlies();
    fetchEvents();
  }, []);

  useEffect(() => {
    const hadFetchedAllAPIS =
      hasFetchedHotels && hasFetchedFlies && hasFetchedEvents;

    if (hadFetchedAllAPIS) {
      fetchedItems.current.fly;
    }
  }, [hasFetchedHotels, hasFetchedFlies, hasFetchedEvents]);

  return {
    packages,
    fetchedItems,
    hasFetchedHotels,
  };
};

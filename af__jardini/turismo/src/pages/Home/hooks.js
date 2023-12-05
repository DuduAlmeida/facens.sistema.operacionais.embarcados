import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import services from "../../services";
import { getPackageList } from "./utils";

export const useHome = () => {
  const navigate = useNavigate();

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
        if (!!data && Array.isArray(data)) fetchedItems.current.fly = data;
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
        if (!!data && Array.isArray(data)) fetchedItems.current.event = data;
        setHasFetchedEvents(true);
      })
      .catch((error) => {
        console.log(error); // Exibe qualquer erro ocorrido na requisição no console
        setHasFetchedEvents(true);
      });
  };

  const preparePackages = () => {
    const package_list = getPackageList(fetchedItems.current);

    setPackages({ isLoading: false, list: package_list });
  };

  const confirmPackage = async (packageSelected = {}) => {
    const hasConfirmed = window.confirm(
      `Você deseja reservar o pacote: ${packageSelected?.title}?`
    );

    if (hasConfirmed) {
      const userID = services.voo.getUserID();

      await services.pacote.reservePackage({
        cpf: userID,
        title: packageSelected?.title,
        flightID: packageSelected?.fly?.id,
        hotelID: packageSelected?.hotel?.id,
        eventID: packageSelected?.event?._id,
      });
    }
  };

  useEffect(() => {
    const hasLoggedIn = services.voo.getHasValidAuth();

    if (!hasLoggedIn) return navigate && navigate("/login");

    fetchHotels();
    fetchFlies();
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const hadFetchedAllAPIS =
      hasFetchedHotels && hasFetchedFlies && hasFetchedEvents;

    if (hadFetchedAllAPIS) {
      const hasAllLists =
        !!fetchedItems.current.event?.length &&
        !!fetchedItems.current.fly?.length &&
        !!fetchedItems.current.hotel?.length;

      console.log("fetchedItems.current", fetchedItems.current, hasAllLists);
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
    confirmPackage,
    hasFetchedHotels,
    hasValidPackages: !!packages.list?.length,
  };
};

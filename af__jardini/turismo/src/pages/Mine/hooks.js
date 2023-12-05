import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import services from "../../services";
import { useHome } from "../Home/hooks";

export const useMine = () => {
  const navigate = useNavigate();
  const homeItems = useHome();

  const [packages, setPackages] = useState({ isLoading: true, list: [] });

  const fetchPackages = () => {
    const userId = services.voo.getUserID();

    services.pacote
      .getMinePackages({ cpf: userId })
      .then((data) => {
        let package_list = [];

        if (!!data?.data && Array.isArray(data?.data))
          package_list = filterPackages(data?.data);

        setPackages({ isLoading: false, list: package_list });
      })
      .catch((error) => {
        console.log(error); // Exibe qualquer erro ocorrido na requisição no console
        setPackages({ isLoading: false, list: [] });
      });
  };

  const filterPackages = (minePackages = []) => {
    minePackages = minePackages.map((packageItem) => {
      const packageInfo = homeItems.packages.list.find(
        (item) => item?.title === packageItem?.title
      );

      if (!packageInfo) return {};

      return { ...packageInfo, id: packageItem?.id };
    });

    return minePackages;
  };

  const cancelPackage = async (packageSelected = {}) => {
    const hasConfirmed = window.confirm(
      `Você deseja cancelar o pacote: ${packageSelected?.title}?`
    );

    if (hasConfirmed) {
      await services.pacote.cancellPackage({
        id: packageSelected?.id,
      });

      fetchPackages();
    }
  };

  useEffect(() => {
    const hasLoggedIn = services.voo.getHasValidAuth();

    if (!hasLoggedIn) return navigate && navigate("/login");

    if (!homeItems.hasValidPackages) return;

    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeItems.hasValidPackages]);

  return {
    packages,
    cancelPackage,
  };
};

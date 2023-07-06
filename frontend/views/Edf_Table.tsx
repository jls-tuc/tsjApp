import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TablaDatos } from "Frontend/components/TablaDatos";
import { EdificiosEndPoint } from "Frontend/generated/endpoints";
export const Edf_Table = () => {
  const location = useLocation();

  const [edificios, setEdificios] = useState<any>([]);

  useEffect(() => {
    let isApiSubscribed = true;
    EdificiosEndPoint.findAll().then((res: any) => {
      if (isApiSubscribed) {
        setTimeout(() => {
          setEdificios(res);
        }, 700);
      }
    });
    return () => {
      isApiSubscribed = false;
    };
  }, [location]);

  return (
    <>
      <TablaDatos
        datos={edificios}
        menu="ABM de Edificios"
        btnNew="Crear un Edificio"
      />
    </>
  );
};

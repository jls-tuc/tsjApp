import { TablaDatos } from "Frontend/components/TablaDatos";
import { EdificiosEndPoint } from "Frontend/generated/endpoints";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const Edf_Table = () => {
  const location = useLocation();

  const [edificios, setEdificios] = useState<any>([]);

  useEffect(() => {
    EdificiosEndPoint.findAll().then((res: any) => {
      setTimeout(() => {
        setEdificios(res);
      }, 700);
    });
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

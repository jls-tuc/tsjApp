import { TablaDatos } from "Frontend/components/TablaDatos";
import { TablaDepEdi } from "Frontend/components/TablaDepEdi";
import {
  DependenciasEndPoint,
  EdificiosEndPoint,
} from "Frontend/generated/endpoints";
import { IDep } from "Frontend/interface/TsjApp.Interface";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Dep_Table = () => {
  let location = useLocation();

  const [tituloMenu, setTituloMenu] = useState<string>("Dependencias Creadas");
  const [dataDepEdi, setDataDepEdi] = useState<any>([]);

  const dataTabla = async () => {
    await EdificiosEndPoint.findAll().then((edificios: any) => {
      let datos: any = [];
      setTimeout(() => {
        for (let edificio of edificios) {
          for (let dep of edificio.dependencia) {
            datos.push({
              id_edificio: edificio.id,
              edificio_nombre: edificio.nombre,
              edificio_domicilio: edificio.domicilio,
              id: dep.id,
              nombre: dep.nombre,
              domicilio: dep.domicilio,
            });
          }
        }
        setDataDepEdi(datos);
      }, 700);
    });
  };

  useEffect(() => {
    dataTabla();
  }, [location]);

  return (
    <>
      <TablaDepEdi datos={dataDepEdi} menu={tituloMenu} id_edificio={0} />
    </>
  );
};

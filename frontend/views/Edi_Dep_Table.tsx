import { TablaDepEdi } from "Frontend/components/TablaDepEdi";
import { IDep } from "Frontend/interface/TsjApp.Interface";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Edi_Dep_Table = () => {
  let location = useLocation();

  const [denpendencias, setDependencias] = useState<IDep[]>([]);
  const [tituloMenu, setTituloMenu] = useState<string>("");
  const [idEdiSelect, setIdEdiSelect] = useState<number>(0);
  useEffect(() => {
    setDependencias(location.state.element.dependencia);
    setTituloMenu(`Dependencias de ${location.state.element.nombre} `);
    setIdEdiSelect(location.state.element.id);
  }, [location]);
  return (
    <>
      <TablaDepEdi
        datos={denpendencias}
        menu={tituloMenu}
        id_edificio={idEdiSelect}
      />
    </>
  );
};

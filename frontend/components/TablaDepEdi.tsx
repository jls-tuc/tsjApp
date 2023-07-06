import { DependenciasEndPoint } from "Frontend/generated/endpoints";
import { IDep } from "Frontend/interface/TsjApp.Interface";
import React, { useState } from "react";

import { ModalDependencia } from "./ModalDependencia";
import { msgBorrar, msgOk } from "./MsgSwal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
interface props {
  datos?: any;
  menu?: string;
  id_edificio: number;
}
export const TablaDepEdi: React.FC<props> = ({ datos, menu, id_edificio }) => {
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ediSelect, setEditSelec] = useState<any>({});
  const [titulo, setTitulo] = useState<string>("");
  const [idEdificio, setIdEdificio] = useState<number>(0);

  const closeModal = () => {
    setOpenModal(!openModal);
  };
  const borrarDependencia = async (dependencia: IDep) => {
    await msgBorrar().then((result: any) => {
      if (result.isConfirmed) {
        let data = {
          id: dependencia.id,
          nombre: dependencia.nombre,
          domicilio: dependencia.domicilio,
        };

        DependenciasEndPoint.deleteDependencia(data)
          .then(async (res) => {
            await msgOk();
            navigate("/edificios");
          })
          .catch(async (err: any) => {
            await msgOk();
            navigate("/edificios");
          });
      } else {
        Swal.fire("No se realizo ninguna modificación", "", "info");
      }
    });
  };

  return (
    <>
      <div className="table-responsive">
        <div className="containerTableTitle">
          <h3 className="headerTableLefet">
            <span className="card-label fw-bolder fs-3 mb-1">{menu}</span>
          </h3>

          {menu !== "Dependencias Creadas" && (
            <div className="col-lg-4 fv-row">
              <button
                className="btn btn-outline-primary mr-3"
                onClick={() => {
                  setTitulo("Crear Dependencia");
                  setEditSelec({
                    nombre: "",
                    domicilio: "",
                    edificio: { id: 0 },
                  });
                  setOpenModal(true);
                }}
              >
                Crear Dependencia
              </button>
            </div>
          )}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="min-w-100px">Nombre</th>
              <th className="min-w-120px">Domicilio</th>
              {menu === "Dependencias Creadas" && (
                <th className="min-w-120px">Edificio al que pertenece</th>
              )}
              <th className="min-w-150px">Opciones</th>
            </tr>
          </thead>
          {datos.length ? (
            <tbody>
              {datos.map((element: any) => {
                return (
                  <tr className="fw-bolder text-muted" key={element.id}>
                    <td>{element.nombre}</td>
                    <td>{element.domicilio}</td>
                    {menu === "Dependencias Creadas" && (
                      <td>{element.edificio_nombre}</td>
                    )}

                    <td>
                      <button
                        className="btn btn-outline-primary mr-10"
                        onClick={() => {
                          setTitulo("Editar Dependencia");
                          setEditSelec(element);
                          setIdEdificio(element.id_edificio);
                          setOpenModal(true);
                        }}
                      >
                        Editar
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          borrarDependencia(element);
                        }}
                      >
                        Eliminar
                      </button>
                      &nbsp;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div className="row">
              <h4 className="col-md-7 col-center">
                **No se registran datos cargados!**
              </h4>
            </div>
          )}
        </table>

        <ModalDependencia
          openModal={openModal}
          closeModal={closeModal}
          dependencia={ediSelect}
          titulo={titulo}
          id_edificio={id_edificio || idEdificio}
        />
      </div>
    </>
  );
};

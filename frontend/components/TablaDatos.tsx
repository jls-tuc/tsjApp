import React, { useState } from "react";
import { PopUpApps } from "./PopUpApps";
import { IEdi } from "Frontend/interface/TsjApp.Interface";
import { EdificiosEndPoint } from "Frontend/generated/endpoints";
import { Link, useNavigate } from "react-router-dom";
import { msgBorrar, msgOk } from "./MsgSwal";
import Swal from "sweetalert2";

interface props {
  datos?: any;
  menu?: string;
  btnNew?: string;
}
export const TablaDatos: React.FC<props> = ({ datos, menu, btnNew }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ediSelect, setEditSelec] = useState<any>({});
  const [titulo, setTitulo] = useState<string>("");
  const [id_edificio, setId_Edificio] = useState<number>(0);
  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const borrarEdificio = async (edificio: IEdi) => {
    await msgBorrar().then((result: any) => {
      if (result.isConfirmed) {
        EdificiosEndPoint.deleteEdificio(edificio).then(async (res) => {
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

          <div className="col-lg-4 fv-row">
            <button
              className="btn btn-outline-primary mr-3"
              onClick={() => {
                menu === "ABM de Edificios"
                  ? setTitulo("Crear Edificio")
                  : setTitulo("Crear Dependencia");
                setEditSelec({ nombre: "", domicilio: "" });
                setOpenModal(true);
              }}
            >
              {btnNew}
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="min-w-100px">Nombre</th>
              <th className="min-w-120px">Domicilio</th>
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

                    <td>
                      <button
                        className="btn btn-outline-primary mr-10"
                        onClick={() => {
                          setTitulo("Editar Edificio");
                          setEditSelec(element);
                          setOpenModal(true);
                        }}
                      >
                        Editar
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          menu === "ABM de Edificios" &&
                            borrarEdificio(element);
                        }}
                      >
                        Eliminar
                      </button>
                      &nbsp;
                      {menu === "ABM de Edificios" && (
                        <Link
                          to="/EdiDep"
                          state={{ element, prev: "edificiosAbm" }}
                        >
                          <button className="btn btn-outline-secondary mr-3">
                            Dependencias Info
                          </button>
                        </Link>
                      )}
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

        <PopUpApps
          openModal={openModal}
          closeModal={closeModal}
          edificio={ediSelect}
          titulo={titulo}
          id_edificio={id_edificio}
        />
      </div>
    </>
  );
};

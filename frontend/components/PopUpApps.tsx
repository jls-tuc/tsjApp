import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Formik } from "formik";
import { IEdi } from "Frontend/interface/TsjApp.Interface";
import { EdificiosEndPoint } from "Frontend/generated/endpoints";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { msgOk, msgUpd } from "./MsgSwal";

interface IModalArea {
  openModal: boolean;
  closeModal(): any;
  edificio: IEdi;
  titulo: string;
  id_edificio: number;
}
export const PopUpApps: React.FC<IModalArea> = ({
  openModal,
  edificio,
  closeModal,
  titulo,
}) => {
  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const saveEdi = async (edificio: IEdi) => {
    await EdificiosEndPoint.add(edificio)
      .then(async (res: any) => {
        if (res) {
          await msgOk();
          closeModal();
          navigate("/edificios");
        }
      })
      .catch(async (erro) => {
        await msgOk();
        closeModal();
        navigate("/edificios");
      });
  };
  const updEdi = async (edificio: IEdi) => {
    let data = {
      edificio: { id: 1 },
      domicilio: edificio.domicilio,
      nombre: edificio.nombre,
      id: edificio.id,
    };
    EdificiosEndPoint.update(data)
      .then(async (res: any) => {
        if (res) {
          await msgUpd();
          closeModal();
          navigate("/edificios");
        }
      })
      .catch(async (erro) => {
        await msgOk();
        closeModal();
        navigate("/edificios");
      });
  };

  return (
    <Modal
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      isOpen={openModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      closeTimeoutMS={500}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="card-header border-0">
        <h3 className="card-title fw-bolder text-dark capital">{titulo}</h3>
        <h5 className="text-gray-400 fw-bold fs-6 capital"></h5>
      </div>

      <div className="card p-5">
        <Formik
          initialValues={edificio}
          validate={(values) => {
            const errors: any = {};
            if (!values.nombre) {
              errors.nombre = "El campo es requerdio";
            }
            if (!values.domicilio) {
              errors.domicilio = "El campo es requerido";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              titulo === "Editar Edificio" ? updEdi(values) : saveEdi(values);
            }, 400);
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre del Edificio</label>
                <input
                  type="text"
                  name="nombre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nombre}
                  className="form-control"
                />
                <span className="badge bg-danger">
                  {errors.nombre && touched.nombre && errors.nombre}
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label">Domicilio del Edificio</label>
                <input
                  type="text"
                  name="domicilio"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.domicilio}
                  className="form-control"
                />
                <span className="badge bg-danger">
                  {errors.domicilio && touched.domicilio && errors.domicilio}
                </span>
              </div>
              <div className="row">
                <div className="col-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Cerrar
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {titulo === "Editar Edificio" ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

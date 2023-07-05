import React from "react";
import Modal from "react-modal";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { IDependencia } from "Frontend/interface/TsjApp.Interface";
import { DependenciasEndPoint } from "Frontend/generated/endpoints";
import Swal from "sweetalert2";
import { msgOk } from "./MsgSwal";

interface IModalArea {
  openModal: boolean;
  closeModal(): any;
  dependencia: IDependencia;
  titulo: string;
  id_edificio: number;
}
export const ModalDependencia: React.FC<IModalArea> = ({
  openModal,
  dependencia,
  closeModal,
  titulo,
  id_edificio,
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

  const saveDep = async (dependencia: IDependencia) => {
    dependencia.edificio.id = id_edificio;

    await DependenciasEndPoint.add(dependencia)
      .then((res: any) => {
        msgOk();
        closeModal();
        navigate("/edificios");
      })
      .catch((err: any) => {
        msgOk();
        closeModal();
        navigate("/edificios");
      });
  };
  const updDep = async (dependencia: any) => {
    let data = {
      domicilio: dependencia.domicilio,
      id: dependencia.id,
      nombre: dependencia.nombre,
      edificio: { id: id_edificio },
    };
    DependenciasEndPoint.update(data).then((res) => {
      console.log(res);
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
          initialValues={dependencia}
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
              saveDep(values);

              titulo === "Editar Dependencia" && updDep(values);
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
                <label className="form-label">Nombre de la Dependencia</label>
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
                <label className="form-label">
                  Domicilio de la Dependencia
                </label>
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
                    {titulo === "Editar Dependencia" ? "Actualizar" : "Guardar"}
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

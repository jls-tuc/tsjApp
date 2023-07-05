import Swal from "sweetalert2";

export const msgOk = async () => {
  await Swal.fire({
    title: "Información procesada correctamente",
    icon: "success",
    toast: true,
  });
};

export const msgBorrar = async () => {
  return Swal.fire({
    title: "Atención",
    text: "Se estan por borrar los datos seleccionados.",
    showCancelButton: true,
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  });
};
export const msgUpd = async () => {
  await Swal.fire({
    title: "Información Actualizada correctamente",
    icon: "success",
    toast: true,
  });
};
export const msgErrDupl = async () => {
  await Swal.fire({
    title: "Verificar los datos ingresados",
    icon: "info",
    toast: true,
  });
};

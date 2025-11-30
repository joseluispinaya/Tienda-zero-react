import Swal from "sweetalert2";

// ALERTA BÁSICA
export const showAlert = (title, message, icon = "info") => {
  return Swal.fire(title, message, icon);
};

// ALERTA CON TIMER
export const showTimedAlert = (title, message, icon = "info", timer = 1500) => {
  return Swal.fire({
    title,
    text: message,
    icon,
    timer,
    showConfirmButton: false,
  });
};

// ALERTA DE CONFIRMACIÓN
export const showConfirm = (
  title,
  message,
  icon = "warning",
  confirmButtonText = "Sí",
  cancelButtonText = "Cancelar"
) => {
  return Swal.fire({
    title,
    text: message,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });
};

// TOAST (NOTIFICACIÓN RÁPIDA)
export const showToast = (message, icon = "success", position = "top-end") => {
  return Swal.fire({
    text: message,
    icon,
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
};

// LOADING / PROCESANDO...
export const showLoading = (title = "Procesando...") => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// Ocultar el loading
export const closeLoading = () => Swal.close();

// ALERTA CON INPUT
export const showInputAlert = async (
  title,
  input = "text",
  placeholder = "",
  icon = "info"
) => {
  return Swal.fire({
    title,
    input: input, // text, email, number, select, textarea, etc.
    inputPlaceholder: placeholder,
    showCancelButton: true,
    icon,
  });
};

// ALERTA CON HTML PERSONALIZADO
export const showHtmlAlert = (title, html, icon = "info") => {
  return Swal.fire({
    title,
    html,
    icon,
    showCloseButton: true,
  });
};
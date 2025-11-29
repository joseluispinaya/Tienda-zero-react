import axiosClient from "./axiosClient";

export const authApi = {
  login: async (correo, clave) => {
    const response = await axiosClient.post("/Acceso/LogeoApp", {
      correo,
      clave
    });

    return response.data; // token + usuarioResp
  }
};
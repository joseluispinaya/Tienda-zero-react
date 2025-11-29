import axiosClient from "./axiosClient";

export const productosApi = {

  listar: async () => {
    const response = await axiosClient.get("/Productos");
    return response.data; 
  },

  listarCategorias: async () => {
    const response = await axiosClient.get("/Productos/ListaCategoApi");
    return response.data; // lista categorías
  },

  guardar: async (formData) => {
    const response = await axiosClient.post("/Productos", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  },

  editar: async (formData) => {
    const response = await axiosClient.put("/Productos", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  }

};
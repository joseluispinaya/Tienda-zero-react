import axiosClient from "./axiosClient";

export const categoriasApi = {

  listar: async () => {
    const response = await axiosClient.get("/Categorias");
    return response.data; 
  },

  guardar: async (categoria) => {
    const response = await axiosClient.post("/Categorias", categoria);
    return response.data; // GenericResponse<bool>
  },

  editar: async (categoria) => {
    const response = await axiosClient.put("/Categorias", categoria);
    return response.data; // GenericResponse<bool>
  }

};
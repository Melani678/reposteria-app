import api from "./api";

export const getClientes = async () => {
  const response = await api.get("/clientes");
  return response.data;
};
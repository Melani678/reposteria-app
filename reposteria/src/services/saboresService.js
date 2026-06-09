import api from "./api";

export const getSabores = async () => {
  const res = await api.get("/sabores");
  return res.data;
};

export const createSabor = async (data) => {
  const res = await api.post("/sabores", data);
  return res.data;
};

export const updateSabor = async (id, data) => {
  const res = await api.patch(`/sabores/${id}`, data);
  return res.data;
};

export const deleteSabor = async (id) => {
  const res = await api.delete(`/sabores/${id}`);
  return res.data;
};
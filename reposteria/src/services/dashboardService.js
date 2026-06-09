import api from "./api";

export const getDashboardStats = async () => {
  const res = await api.get("/reportes/resumen");
  return res.data;
};
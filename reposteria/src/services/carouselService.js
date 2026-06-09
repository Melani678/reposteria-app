import api from "./api";

export const getCarousel = async () => {
  const res = await api.get("/carousel");
  return res.data;
};

export const createCarousel = async (data) => {
  const res = await api.post("/carousel", data);
  return res.data;
};

export const deleteCarousel = async (id) => {
  const res = await api.delete(`/carousel/${id}`);
  return res.data;
};
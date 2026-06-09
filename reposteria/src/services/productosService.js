import api from "./api";

export const getProductos = async () => {
  const res = await api.get("/productos");
  return res.data;
};

export const getProductoById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

// CREATE
export const createProducto = async (data) => {
  const res = await api.post("/productos", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// UPDATE
export const updateProducto = async (id, data) => {
  const res = await api.patch(`/productos/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// DELETE
export const deleteProducto = async (id) => {
  const res = await api.delete(`/productos/${id}`);
  return res.data;
};
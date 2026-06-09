import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./css/eliminarP.css";

import {
  getProductoById,
  deleteProducto
} from "../../services/productosService";

function EliminarProducto() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [producto, setProducto] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    const cargarProducto = async () => {

      try {

        const data =
          await getProductoById(id);

        setProducto(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    cargarProducto();

  }, [id]);

  const handleDelete = async () => {

    try {

      await deleteProducto(id);

      alert(
        "Producto eliminado correctamente"
      );

      navigate("/admin/productos");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Error al eliminar producto"
      );

    }

  };

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (!producto) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <>
      <div className="delete-product-page">

        <div className="delete-product-card">

          <div className="delete-product-content">

            <div className="delete-product-image">

              {producto.imagen ? (

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                />

              ) : (

                <div>
                  Sin imagen
                </div>

              )}

            </div>

            <div className="delete-product-info">

              <h2>
                ¿Eliminar producto?
              </h2>

              <p>
                {producto.nombre}
              </p>

              <button
                onClick={() =>
                  setShowModal(true)
                }
              >
                Eliminar Producto
              </button>

              <br />

              <button
                className="cancel-btn"
                onClick={() =>
                  navigate("/admin/productos")
                }
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      </div>

      {showModal && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <h3>
              Confirmar eliminación
            </h3>

            <p>
              Esta acción no se puede deshacer.
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancelar
              </button>

              <button
                className="confirm-btn"
                onClick={handleDelete}
              >
                Eliminar
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default EliminarProducto;
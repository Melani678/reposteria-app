import { useNavigate } from "react-router-dom";

import "./prodCA.css";


function ProductoCardAdmin({ producto }) {

  const navigate = useNavigate();

  const eliminarProducto = () => {

    const confirmar = window.confirm(
      `¿Eliminar ${producto.nombre}?`
    );

    if (!confirmar) return;

    alert("Producto eliminado (mock)");
  };

  return (

    <div
      className="admin-card"
      onClick={() =>
        navigate(`/admin/productos/detalle/${producto.id_producto}`)
      }
    >
      

      {producto.imagen && (
        <img src={producto.imagen} alt={producto.nombre} />
      )}

      <div className="card-body">

        <span className="tipo-badge">
          {producto.tipo}
        </span>

        <h3>{producto.nombre}</h3>

        <p>{producto.descripcion}</p>

        <h4>
          Bs. {producto.precio}
        </h4>

        {producto.stock !== null && (
          <p>
            Stock: {producto.stock}
          </p>
        )}

      </div>

      <div className="product-actions">

        <button
          className="product-edit-btn"
          onClick={(e) => {
            e.stopPropagation();

            navigate(
              `/admin/productos/editar/${producto.id_producto}`
            );
          }}
        >
          Editar
        </button>

        <button
          className="product-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              `/admin/productos/eliminar/${producto.id_producto}`
            );
          }}
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}

export default ProductoCardAdmin;
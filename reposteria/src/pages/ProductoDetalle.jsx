import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/productoD.css";

import { getProductoById } from "../services/productosService";
import { API_URL } from "../services/api";
function ProductoDetalle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    cargarProducto();

  }, [id]);

  const cargarProducto = async () => {

    try {

      const data =
        await getProductoById(id);

      setProduct(data);

    } catch (error) {

      console.error(error);

      setProduct(null);

    } finally {

      setLoading(false);

    }

  };
  if (loading) {
    return <h2>Cargando producto...</h2>;
  }
  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div className="detail-page">

      {/* IMAGEN */}
      <div className="detail-image">
        <img src={producto.imagen} alt={product.nombre} />
      </div>

      {/* INFO */}
      <div className="detail-info">

        <span className="detail-brand">
          {product.tipo}
        </span>

        <h1>{product.nombre}</h1>

        <p className="detail-price">
          Bs. {product.precio}
        </p>

        <p>{product.descripcion}</p>

        <h3>Ingredientes</h3>
        <p>{product.ingredientes}</p>

        {/* SOLO TORTAS */}
        {product.tipo === "TORTA" && product.torta && (
          <>
            <h3>Cantidad de pisos</h3>
            <p>{product.torta.cantidad_pisos}</p>

            <h3>Cantidad de personas</h3>
            <p>{product.torta.cantidad_personas}</p>

            <h3>Forma</h3>
            <p>{product.torta.forma_torta}</p>

            <h3>Personalización</h3>
            <p>
              {product.torta.permite_personalizacion_imagen
                ? "Permite imagen personalizada"
                : "Sin personalización"}
            </p>
          </>
        )}

        {product.tipo === "CUPCAKE" && product.cupcake && (
            <>
              <h3>Color de crema</h3>

              <p>
                {product.cupcake.permite_color_crema
                  ? "Permitido"
                  : "No permitido"}
              </p>
            </>
          )}
        {product.tipo === "GALLETA" && product.galleta && (
          <>
            <h3>Sabor</h3>

            <p>
              {product.galleta.sabor}
            </p>
          </>
        )}
        {product.tipo === "QUEQUE" && product.queque && (
          <>
            <h3>Sabor</h3>

            <p>
              {product.queque.sabor}
            </p>
          </>
        )}

      </div>

      {/* BACK */}
      <div className="back-btn">
        <button
          className="back-button"
          onClick={() => navigate("/productos")}
        >
          Volver a productos
        </button>
      </div>

    </div>
  );
}

export default ProductoDetalle;
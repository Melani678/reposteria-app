import { useNavigate } from "react-router-dom";
import React from "react";
import { useCart } from "../context/CartContext";
import { API_URL } from "../services/api";
import "./css/productoC.css";
function ProductoCard({ producto }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const enviarWhatsApp = (e) => {
    e.stopPropagation(); // Evita que se active el onClick del card
    const mensaje = `Hola quiero pedir: ${producto.nombre}`;
    window.open(`https://wa.me/59178838759?text=${encodeURIComponent(mensaje)}`);
  };
   const handleAddToCart = (e) => {
        e.stopPropagation(); // evita que navegue al detalle
        addToCart({
        id: producto.id_producto,
        name: producto.nombre,
        price: producto.precio,
        image: producto.imagen,
        tipo: producto.tipo
        });
    };

  return (
     <div className="card" onClick={() => navigate(`/producto/${producto.id_producto}`)}>

      <img src={`${API_URL}${producto.imagen}`} alt={producto.nombre} />

      <div className="card-body">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>

        <span className="tipo">{producto.tipo}</span>

        <h4>Bs. {producto.precio}</h4>

        {producto.stock !== null && (
          <p className="stock">
            Stock disponible: {producto.stock}
          </p>
        )}

        <div className="acciones">

          {producto.tipo_venta === "CARRITO" && (
            <button
              className="btn-carrito"
              onClick={handleAddToCart}
            >
              Agregar al carrito 
            </button>
          )}

          {/*  WHATSAPP */}
          {producto.tipo_venta === "WHATSAPP" && (
            <button
              className="btn-wsp"
              onClick={enviarWhatsApp}
            >
              Pedir por WhatsApp 
            </button>
          )}

        </div>
      </div>

    </div>
  );
}

export default ProductoCard;
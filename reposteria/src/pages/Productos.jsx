
import { useEffect, useState } from "react";
import { getProductos } from "../services/productosService";
import ProductoCard from "../components/ProductoCard";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import "./css/productos.css";

function Productos() {

  const [filtro, setFiltro] = useState("TODOS");

  const [productos, setProductos] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    cargarProductos();

  }, []);

  const cargarProductos = async () => {

    try {

      const data = await getProductos();

      setProductos(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const { cart, getTotal } = useCart();

  const productosFiltrados =
    filtro === "TODOS"
      ? productos
      : productos.filter(p => p.tipo === filtro);

  const navigate = useNavigate();
  if (loading) {
    return <h2>Cargando productos...</h2>;
  }
  return (
    <div className="productos-layout">

      {/*  IZQUIERDA: PRODUCTOS */}
      <div className="productos-section">

        <h1>Nuestros Productos</h1>

        {/* FILTROS */}
        <div className="filtros">
          {["TODOS", "TORTA", "CUPCAKE", "GALLETA", "QUEQUE", "POSTRE"].map(tipo => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={filtro === tipo ? "active" : ""}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid">
          {productosFiltrados.map(p => (
            <ProductoCard key={p.id_producto} producto={p} />
          ))}
        </div>

      </div>

      {/* DERECHA: CARRITO (MISMO DISEÑO QUE Carrito.jsx) */}
      <div className="cart-sidebar">

        <h1> Mi Carrito</h1>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}

            <h2>Total: Bs. {getTotal()}</h2>

            <button
              className="btn-checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceder al pedido 
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default Productos;
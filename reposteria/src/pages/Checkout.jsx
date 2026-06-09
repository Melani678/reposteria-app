import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import "./css/checkout.css";
import { useNavigate } from "react-router-dom";
function Checkout() {  
  const navigate = useNavigate();
  const {
    cart,
    getTotal,
    clearCart
  } = useCart();
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    correo: ""
  });
  
  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const enviarPedido = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      //  ADAPTAR datos al backend
      const itemsAdaptados = cart.map(item => ({
        id: item.id,          // backend usa id_producto
        quantity: item.quantity,
        price: item.price
      }));

      await api.post(
        "/compras",
        {
          items: itemsAdaptados,
          total: getTotal()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      let mensaje = ` *NUEVO PEDIDO*%0A%0A`;

      mensaje += ` Cliente: ${cliente.nombre}%0A`;
      mensaje += ` Teléfono: ${cliente.telefono}%0A`;
      mensaje += ` Dirección: ${cliente.direccion}%0A%0A`;

      mensaje += ` *PRODUCTOS:*%0A`;

      cart.forEach(item => {
        mensaje += `• ${item.name} x${item.quantity} - Bs ${item.price * item.quantity}%0A`;
      });

      mensaje += `%0A *Total: Bs. ${getTotal()}*`;

      window.open(
        `https://wa.me/59178838759?text=${mensaje}`,
        "_blank"
      );

      // Vaciar carrito
      clearCart();

      // Volver a productos
      navigate("/productos");

    } catch (error) {
      console.error("ERROR COMPRA:", error?.response?.data || error);
      alert("Error al procesar pedido");
    }
  };
  return (
    <div className="checkout-container">

      <h1>Finalizar Pedido</h1>

      <div className="checkout-form">

        <input name="nombre" placeholder="Nombre completo"
          value={cliente.nombre} onChange={handleChange} />

        <input name="telefono" placeholder="Teléfono"
          value={cliente.telefono} onChange={handleChange} />

        <input name="direccion" placeholder="Dirección"
          value={cliente.direccion} onChange={handleChange} />

      </div>

      <div className="checkout-resumen">

        <h2>Resumen</h2>

        {cart.map(item => (
          <div key={item.id}>
            <p>{item.name} x {item.quantity}</p>
          </div>
        ))}

        <h3>Total: Bs. {getTotal()}</h3>

      </div>

      <button className="btn-confirmar" onClick={enviarPedido}>
        Confirmar pedido
      </button>

    </div>
  );
}

export default Checkout;
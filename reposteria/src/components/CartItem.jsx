import { useCart } from "../context/CartContext";
import "./css/carrito.css";
import { API_URL } from "../services/api";
function CartItem({ item }) {

  const { removeFromCart, updateQuantity } = useCart();
 
  return (
    <div className="cart-item">

      <img src={producto.imagen} />
      
      <div>
        <h3>{item.name}</h3>
        <p>Bs. {item.price}</p>

        <div className="qty">

          <button
            onClick={() =>
              updateQuantity(item.id, item.quantity - 1)
            }
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              updateQuantity(item.id, item.quantity + 1)
            }
          >
            +
          </button>

        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="btn-remove"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}

export default CartItem;
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(""); //  AQUÍ SÍ VA BIEN

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };
  const clearCart = () => {
    setCart([]);
  };
  // AGREGAR PRODUCTO
  const addToCart = (product) => {
    console.log("PRODUCTO ORIGINAL:", product);

    setCart((prev) => {
      const exists = prev.find(p => p.id === product.id);

      if (exists) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,   // 🔥 SOLO ESTE NOMBRE
          quantity: 1
        }
      ];
    });
  };

  // ELIMINAR
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
    showToast("Producto eliminado ");
  };

  //  CANTIDAD
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;

    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity } : p
      )
    );
  };

  //  TOTAL
  const getTotal = () => {
    return cart.reduce((acc, item) =>
      acc + item.price * item.quantity
    , 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal,
      clearCart,
      toast
    }}>
      {children}
    </CartContext.Provider>
  );
}
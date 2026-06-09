import { useCart } from "../context/CartContext";

function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="toast">
      {toast}
    </div>
  );
}

export default Toast;
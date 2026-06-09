import { useNavigate } from "react-router-dom";
import ProductoCardAdmin from "../../components/admin/ProductoCardAdmin";

import "./css/productosAdmin.css";

import {
  useEffect,
  useState
} from "react";

import {
  getProductos
} from "../../services/productosService";
function ProductosAdmin() {

  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    cargarProductos();

  }, []);

  const cargarProductos = async () => {

    try {

      const data =
        await getProductos();

      setProductos(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };
  if (loading) {
    return <h2>Cargando...</h2>;
  }
    return (
    <div className="productos-admin">

      <div className="admin-header">

        <h1>Administrar Productos</h1>

        <button
          className="btn-add-product"
          onClick={() => navigate("/admin/productos/nuevo")}
        >
          + Añadir Producto
        </button>

      </div>

      <div className="grid">

        {productos.map(producto => (

          <ProductoCardAdmin
            key={producto.id_producto}
            producto={producto}
          />

        ))}

      </div>
      <div className="admin-footer">
        <button
          className="btn-back"
          onClick={() => navigate("/admin")}
        >
          Volver al Panel
        </button>
      </div>

    </div>
  );
}

export default ProductosAdmin;
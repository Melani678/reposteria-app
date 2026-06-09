import { NavLink } from "react-router-dom";
import "./adminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <h2> Admin</h2>

      <NavLink to="/admin">
        Dashboard
      </NavLink>

      <NavLink to="/admin/productos">
        Productos
      </NavLink>
      
      <NavLink to="/admin/sabores">
        Sabores
      </NavLink>
      <NavLink to="/admin/clientes">
        Clientes
      </NavLink>

      <NavLink to="/admin/reportes">
        Reportes
      </NavLink>
      <NavLink to="/admin/carrusel">
        Carrusel
      </NavLink>

    </aside>
  );
}

export default AdminSidebar;
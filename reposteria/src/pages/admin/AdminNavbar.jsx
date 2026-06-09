import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";
import "./css/adminNavbar.css";

function AdminNavbar() {

  const navigate = useNavigate();

  const { usuario, logout } = useAuth();

  const cerrarSesion = async () => {
    try {
      if (usuario?.id_usuario) {
        await logoutUser(usuario.id_usuario);
      }
    } catch (error) {
      console.error(error);
    } finally {
      logout();
      navigate("/auth");
    }
  };

  return (
    <header className="admin-navbar">

      <h2>Panel Administrador</h2>

      <div className="admin-user">

        <span>
           {usuario?.correo}
        </span>

        <button onClick={cerrarSesion}>
          Cerrar sesión
        </button>

      </div>

    </header>
  );
}

export default AdminNavbar;
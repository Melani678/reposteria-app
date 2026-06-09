import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "./css/clientes.css";
import { getClientes } from "../../services/clientesService";

function Clientes() {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {

    const cargarClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error(error);
      }
    };

    cargarClientes();

  }, []);

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <h1>Clientes</h1>

        <table className="clientes-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Puntos</th>
            </tr>
          </thead>

          <tbody>

            {clientes.map(c => (
              <tr key={c.id_cliente}>
                <td>{c.id_cliente}</td>
                <td>{c.usuario?.nombre} {c.usuario?.apellido}</td>
                <td>{c.usuario?.correo}</td>
                <td>{c.usuario?.telefono}</td>
                <td>{c.puntos_compras}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </main>

    </div>
  );
}

export default Clientes;
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
              <th>Puntos</th>
              <th>Último ingreso</th>
              <th>Última salida</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map(c => (
              <tr key={c.id_cliente}>
                <td>{c.id_cliente}</td>
                <td>{c.usuario?.nombre} {c.usuario?.apellido}</td>
                <td>{c.usuario?.correo}</td>
                <td>{c.puntos_compras}</td>
                <td>{c.ultimo_ingreso ? new Date(c.ultimo_ingreso).toLocaleString() : '—'}</td>
                <td>{c.ultima_salida ? new Date(c.ultima_salida).toLocaleString() : '—'}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </main>

    </div>
  );
}

export default Clientes;
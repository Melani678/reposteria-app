import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { getDashboardStats } from "../../services/dashboardService";

import "./css/adminDashboard.css";

function AdminDashboard() {

  const [stats, setStats] = useState({
    productos: 0,
    clientes: 0,
    pedidos: 0,
    ventas: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarStats();
  }, []);

  const cargarStats = async () => {
    try {
      const data = await getDashboardStats();

      setStats({
        productos: data.productos || 0,
        clientes: data.clientes || 0,
        pedidos: data.pedidos || 0,
        ventas: data.ventas || 0,
      });

    } catch (error) {
      console.error("Error dashboard:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <h2>Cargando dashboard...</h2>;
  }

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <h1>Dashboard</h1>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Productos</h3>
            <span>{stats.productos}</span>
          </div>

          <div className="stat-card">
            <h3>Clientes</h3>
            <span>{stats.clientes}</span>
          </div>

          <div className="stat-card">
            <h3>Pedidos</h3>
            <span>{stats.pedidos}</span>
          </div>

          <div className="stat-card">
            <h3>Ventas</h3>
            <span>Bs. {stats.ventas}</span>
          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;
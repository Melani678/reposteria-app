import { useEffect, useState } from "react";
import api from "../../services/api";
import "./css/reportes.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Reportes() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/reportes/resumen").then(res => setStats(res.data));
  }, []);

  if (!stats) return <p className="loading">Cargando reportes...</p>;

  //  datos para gráfico
  const dataChart = [
    { nombre: "Productos", valor: stats.productos },
    { nombre: "Clientes", valor: stats.clientes },
    { nombre: "Pedidos", valor: stats.pedidos },
    { nombre: "Ventas", valor: stats.ventas },
  ];

  return (
    <div className="reportes">

      {/* HEADER */}
      <div className="reportes-header">
        <div>
          <h1> Reportes del negocio</h1>
          <p>Resumen general del rendimiento</p>
        </div>

        <a
          className="pdf-btn"
          href="https://reposteria-backend.onrender.com/reportes/pdf"
          target="_blank"
        >
           Descargar PDF
        </a>
      </div>

      {/* RESUMEN CARDS */}
      <div className="resumen">

        <div className="card blue">
          <h3>Productos</h3>
          <p>{stats.productos}</p>
        </div>

        <div className="card green">
          <h3>Clientes</h3>
          <p>{stats.clientes}</p>
        </div>

        <div className="card orange">
          <h3>Pedidos</h3>
          <p>{stats.pedidos}</p>
        </div>

        <div className="card purple">
          <h3>Ventas</h3>
          <p>Bs {stats.ventas}</p>
        </div>

      </div>

      {/*  GRÁFICO */}
      <div className="chart-container">
        <h2>Estadísticas visuales</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataChart}>
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#ff6f91" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Reportes;
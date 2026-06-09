import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Checkout from "./pages/Checkout";
import CheckoutTorta from "./pages/CheckoutTorta";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Auth from "./pages/auth/Auth";

import AdminNavbar from "./pages/admin/AdminNavbar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import NuevoProducto from "./pages/admin/NuevoProducto";
import ProductoDetalleA from "./pages/admin/ProductoDetalleA";
import EditarProducto from "./pages/admin/EditarProducto";
import EliminarProducto from "./pages/admin/EliminarProducto";
import Sabores from "./pages/admin/Sabores";
import Clientes from "./pages/admin/Clientes";
import Reportes from "./pages/admin/Reportes";
import AdminCarrusel from "./pages/admin/AdminCarrusel";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

import { useAuth } from "./context/AuthContext";

function App() {

  const { usuario } = useAuth();

  const esAdmin = usuario?.rol === "admin";

  return (
    <>
      {/* NAVBAR */}
      {esAdmin ? <AdminNavbar /> : <Navbar />}

      <Routes>

        {/* ====================================================== */}
        {/* RUTAS PÚBLICAS */}
        {/* ====================================================== */}

        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* ====================================================== */}
        {/* RUTAS DE USUARIO / CLIENTE */}
        {/* ====================================================== */}

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <Productos />
            </PrivateRoute>
          }
        />

        <Route
          path="/producto/:id"
          element={
            <PrivateRoute>
              <ProductoDetalle />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout-torta"
          element={
            <PrivateRoute>
              <CheckoutTorta />
            </PrivateRoute>
          }
        />

        {/* ====================================================== */}
        {/* RUTAS DE ADMINISTRADOR */}
        {/* ====================================================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <ProductosAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos/nuevo"
          element={
            <AdminRoute>
              <NuevoProducto />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos/detalle/:id"
          element={
            <AdminRoute>
              <ProductoDetalleA />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos/editar/:id"
          element={
            <AdminRoute>
              <EditarProducto />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos/eliminar/:id"
          element={
            <AdminRoute>
              <EliminarProducto />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/sabores"
          element={
            <AdminRoute>
              <Sabores />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/clientes"
          element={
            <AdminRoute>
              <Clientes />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reportes"
          element={
            <AdminRoute>
              <Reportes />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/carrusel"
          element={
            <AdminRoute>
              <AdminCarrusel />
            </AdminRoute>
          }
        />

      </Routes>

      {/* FOOTER SOLO PARA CLIENTES */}
      {!esAdmin && <Footer />}
    </>
  );
}

export default App;
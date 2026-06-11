import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import "./css/navbar.css";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { cart } = useCart();
    const { usuario, logout } = useAuth();


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const cerrarSesion = async () => {

        try {

            await logoutUser(usuario.id_usuario);

        } catch (error) {
            console.error(error);
        }

        logout();

        navigate("/auth");

    };

    return (
        <header className="navbar">
            <div className="container">
                <nav className="nav">

                    {/* LOGO */}
                    <div className="logo">
                        <h1> Dulce Encanto</h1>
                    </div>

                    {/* LINKS */}
                    <ul className={isOpen ? "nav-links active" : "nav-links"}>

                        <li>
                            <NavLink to="/">Inicio</NavLink>
                        </li>

                        <li>
                            <NavLink to="/productos">
                                Productos
                                
                            </NavLink>
                        </li>

                        <li>
                            <span>
                                Carrito
                                <span className="cart-badge">
                                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            </span>
                        </li>
                        <li>
                            <button
                                className="btn-torta"
                                onClick={() => navigate("/checkout-torta")}
                            >
                                 Pedir Torta
                            </button>
                        </li>
                        

                        {/* ADMIN PANEL (opcional futuro) */}
                        {usuario?.rol === "admin" && (
                            <li>
                                <NavLink to="/admin">Admin</NavLink>
                            </li>
                        )}

                        {/* SI NO HAY USUARIO */}
                        {!usuario && (
                            <li>
                                <NavLink to="/auth">Ingresar</NavLink>
                            </li>
                        )}

                        {/* SI HAY USUARIO */}
                        {usuario && (
                            <>
                                <li className="user-info">
                                     {usuario?.correo}
                                </li>

                                <li>
                                    <button className="btn-logout" onClick={cerrarSesion}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>

                    
                    <div className="menu-icon" onClick={toggleMenu}>
                        <FaBars />
                    </div>

                </nav>
            </div>
        </header>
    );
}

export default Navbar;
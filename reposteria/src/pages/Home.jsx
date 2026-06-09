import { useNavigate } from "react-router-dom";
import CarouselSlider from "../components/CarouselSlider";
import "./css/home.css";

function Home() {

  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      nombre: "Tortas artesanales"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1587668178277-295251f900ce",
      nombre: "Cupcakes personalizados"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1606313564200",
      nombre: "Pedidos por WhatsApp"
    }
  ];

  return (
    <div className="home">

      <div className="home-hero">

        <CarouselSlider slides={slides} />

        <div className="hero-overlay">
          <h1>
            Bienvenido a reposteria <span> Dulce Encanto</span>
          </h1>

          <p>
            Descubre tortas, cupcakes y postres artesanales 
          </p>

          <button
            className="btn-home"
            onClick={() => navigate("/productos")}
          >
            Ver productos
          </button>

        </div>

      </div>

      <div className="home-info">

        <div className="info-card">
          <h3>Tortas Personalizadas</h3>
          <p>Diseños únicos para tus momentos especiales</p>
        </div>

        <div className="info-card">
          <h3>Cupcakes Creativos</h3>
          <p>Sabores únicos y decoraciones increíbles</p>
        </div>

        <div className="info-card">
          <h3>Pedido Fácil</h3>
          <p>Compra en línea o por WhatsApp</p>
        </div>

      </div>

    </div>
  );
}

export default Home;
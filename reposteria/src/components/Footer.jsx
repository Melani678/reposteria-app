import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./css/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <h2> Repostería Dulce Encanto</h2>
        <p>Hecho con amor para tus momentos especiales</p>

        <div className="socials">
          <FaFacebook />
          <FaInstagram />
          <FaWhatsapp />
        </div>

        <p className="copy">
          © 2026 Repostería Dulce. Todos los derechos reservados.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
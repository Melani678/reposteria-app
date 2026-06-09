import { useState } from "react";
import "./css/checkoutTorta.css";

function CheckoutTorta() {

  const [form, setForm] = useState({
    forma: "",
    sabor: "",
    relleno: "",
    mensaje: "",
    fecha: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const enviarWhatsApp = () => {

    const mensaje = `
    NUEVO PEDIDO DE TORTA

    Forma: ${form.forma}
    Sabor: ${form.sabor}
    Relleno: ${form.relleno}
    Mensaje: ${form.mensaje}
    Fecha: ${form.fecha}
    `;

    const url = `https://wa.me/59178838759?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="checkout-torta">

      <h1> Personaliza tu Torta</h1>

      <div className="form-grid">

        <select name="forma" onChange={handleChange}>
          <option value="">Forma</option>
          <option value="Redonda">Redonda</option>
          <option value="Cuadrada">Cuadrada</option>
          <option value="Corazón">Corazón</option>
          <option value="Personalizada">Personalizada</option>
        </select>

        <select name="sabor" onChange={handleChange}>
          <option value="">Sabor</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Vainilla">Vainilla</option>
          <option value="Red Velvet">Red Velvet</option>
        </select>

        <select name="relleno" onChange={handleChange}>
          <option value="">Relleno</option>
          <option value="Dulce de leche">Dulce de leche</option>
          <option value="Fresa">Fresa</option>
          <option value="Chocolate">Chocolate</option>
        </select>

        <input
          name="fecha"
          type="date"
          onChange={handleChange}
        />

        <textarea
          name="mensaje"
          placeholder="Mensaje en la torta"
          onChange={handleChange}
        />

      </div>

      <button className="btn-whatsapp" onClick={enviarWhatsApp}>
        Enviar pedido por WhatsApp 
      </button>

    </div>
  );
}

export default CheckoutTorta;
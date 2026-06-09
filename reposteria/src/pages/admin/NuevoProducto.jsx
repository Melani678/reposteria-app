import { useState } from "react";
import "./css/nuevoProducto.css";
import {
  createProducto
} from "../../services/productosService";
import { useNavigate } from "react-router-dom";
function NuevoProducto() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    ingredientes: "",
    precio: "",
    stock: "",
    tipo: "TORTA",
    tipo_venta: "CARRITO",
    imagen: null,

    // TORTA
    cantidad_pisos: 1,
    cantidad_personas: "",
    forma_torta: "CIRCULO",
    permite_personalizacion_imagen: true,

    // CUPCAKE
    permite_color_crema: true,

    // GALLETA
    sabor_galleta: "",

    // QUEQUE
    sabor_queque: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    const camposNumericos = [
      "precio",
      "stock",
      "cantidad_pisos",
      "cantidad_personas"
    ];

    setForm({
      ...form,
      [name]:
        camposNumericos.includes(name)
          ? value === ""
            ? ""
            : Number(value)
          : value
    });

  };
  const [preview, setPreview] = useState(null);
  const handleFile = (e) => {

    const file = e.target.files[0];

    setForm({
      ...form,
      imagen: file
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      formData.append("ingredientes", form.ingredientes);
      formData.append("precio", String(form.precio));
      formData.append("tipo", form.tipo);
      formData.append("tipo_venta", form.tipo_venta);
      formData.append("activo", "true");

      if (form.imagen) {
        formData.append("imagen", form.imagen);
      }

      if (form.tipo !== "TORTA") {
        formData.append("stock", form.stock);
      } else {
        formData.append("stock", "");
      }

      if (form.tipo === "TORTA") {
        formData.append("cantidad_pisos", form.cantidad_pisos);
        formData.append("cantidad_personas", form.cantidad_personas);
        formData.append("forma_torta", form.forma_torta);
        formData.append(
          "permite_personalizacion_imagen",
          form.permite_personalizacion_imagen
        );
      }

      if (form.tipo === "CUPCAKE") {
        formData.append(
          "permite_color_crema",
          form.permite_color_crema
        );
      }

      if (form.tipo === "GALLETA") {
        formData.append("sabor_galleta", form.sabor_galleta);
      }

      if (form.tipo === "QUEQUE") {
        formData.append("sabor_queque", form.sabor_queque);
      }

      await createProducto(formData);

      alert("Producto creado correctamente");
      navigate("/admin/productos");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="nuevo-producto">

      <h1>Nuevo Producto</h1>

      <form onSubmit={handleSubmit} className="form-producto">
        {/* IMAGEN */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="preview-img"
          />
        )}
        {/* NOMBRE */}
        <input
          name="nombre"
          placeholder="Nombre del producto"
          onChange={handleChange}
          required
        />

        {/* DESCRIPCIÓN */}
        <textarea
          name="descripcion"
          placeholder="Descripción"
          onChange={handleChange}
        />

        {/* INGREDIENTES */}
        <textarea
          name="ingredientes"
          placeholder="Ingredientes"
          onChange={handleChange}
        />

        {/* PRECIO */}
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          onChange={handleChange}
          required
        />

        {/* STOCK */}
        {form.tipo !== "TORTA" && (
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            onChange={handleChange}
            required
          />
        )}

        {/* TIPO (IMPORTANTE) */}
        <select name="tipo" onChange={handleChange}>
          <option value="TORTA">Torta</option>
          <option value="CUPCAKE">Cupcake</option>
          <option value="GALLETA">Galleta</option>
          <option value="QUEQUE">Queque</option>
          <option value="POSTRE">Postre</option>
        </select>
        
        
        {form.tipo === "TORTA" && (
          <>

            <input
              type="number"
              name="cantidad_pisos"
              placeholder="Cantidad de pisos"
              value={form.cantidad_pisos}
              onChange={handleChange}
            />

            <input
              type="number"
              name="cantidad_personas"
              placeholder="Cantidad de personas"
              value={form.cantidad_personas}
              onChange={handleChange}
            />

            <select
              name="forma_torta"
              value={form.forma_torta}
              onChange={handleChange}
            >
              <option value="CIRCULO">Círculo</option>
              <option value="CUADRADO">Cuadrado</option>
              <option value="RECTANGULO">Rectángulo</option>
              <option value="CORAZON">Corazón</option>
              <option value="PERSONALIZADA">Personalizada</option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={form.permite_personalizacion_imagen}
                onChange={(e) =>
                  setForm({
                    ...form,
                    permite_personalizacion_imagen: e.target.checked
                  })
                }
              />
              Permite personalización con imagen
            </label>

          </>
        )}

        {form.tipo === "CUPCAKE" && (

          <label>
            <input
              type="checkbox"
              checked={form.permite_color_crema}
              onChange={(e) =>
                setForm({
                  ...form,
                  permite_color_crema: e.target.checked
                })
              }
            />
            Permite color de crema
          </label>

        )}
        {form.tipo === "GALLETA" && (

          <input
            name="sabor_galleta"
            placeholder="Sabor"
            value={form.sabor_galleta}
            onChange={handleChange}
          />

        )}
        {form.tipo === "QUEQUE" && (

          <input
            name="sabor_queque"
            placeholder="Sabor"
            value={form.sabor_queque}
            onChange={handleChange}
          />

        )}

        {/* TIPO VENTA */}
        <select name="tipo_venta" onChange={handleChange}>
          <option value="CARRITO">Carrito</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>

        

        {/* BOTÓN */}
        <button type="submit">
          Crear Producto
        </button>

      </form>

    </div>
  );
}

export default NuevoProducto;
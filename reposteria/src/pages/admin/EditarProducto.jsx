import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";
import "./css/nuevoProducto.css";
import { useNavigate } from "react-router-dom";
import {
  getProductoById,
  updateProducto
} from "../../services/productosService";

function EditarProducto() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    ingredientes: "",
    precio: "",
    stock: "",
    tipo: "TORTA",
    tipo_venta: "CARRITO",
    imagen: "",

    cantidad_pisos: 1,
    cantidad_personas: "",
    forma_torta: "CIRCULO",
    permite_personalizacion_imagen: true,

    permite_color_crema: true,

    sabor_galleta: "",

    sabor_queque: ""
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {

    const cargarProducto = async () => {

      try {

        const producto =
          await getProductoById(id);

        console.log("PRODUCTO:", producto);

        setForm({
          nombre: producto.nombre ?? "",
          descripcion: producto.descripcion ?? "",
          ingredientes: producto.ingredientes ?? "",
          precio: producto.precio ?? "",
          stock:
            producto.stock === null
              ? ""
              : producto.stock,

          tipo: producto.tipo ?? "TORTA",

          tipo_venta:
            producto.tipo_venta ?? "CARRITO",

          imagen:
            producto.imagen ?? "",

          cantidad_pisos:
            producto.torta?.cantidad_pisos ?? 1,

          cantidad_personas:
            producto.torta?.cantidad_personas ?? "",

          forma_torta:
            producto.torta?.forma_torta ?? "CIRCULO",

          permite_personalizacion_imagen:
            producto.torta?.permite_personalizacion_imagen ?? true,

          permite_color_crema:
            producto.cupcake?.permite_color_crema ?? true,

          sabor_galleta:
            producto.galleta?.sabor ?? "",

          sabor_queque:
            producto.queque?.sabor ?? ""
        });

        if (producto.imagen) {
          setPreview(producto.imagen);
        }

      } catch (error) {

        console.error(error);

      }

    };

    cargarProducto();

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    const camposNumericos = [
      "precio",
      "stock",
      "cantidad_pisos",
      "cantidad_personas"
    ];

    setForm(prev => ({
      ...prev,
      [name]:
        camposNumericos.includes(name)
          ? value === ""
            ? ""
            : Number(value)
          : value
    }));

  };

  const handleFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setForm(prev => ({
      ...prev,
      imagen: file
    }));

    setPreview(
      URL.createObjectURL(file)
    );

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

      // ⚠️ IMPORTANTE: solo enviar imagen si es File
      if (form.imagen instanceof File) {
        formData.append("imagen", form.imagen);
      }

      if (form.tipo !== "TORTA") {
        formData.append("stock", form.stock);
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

      await updateProducto(id, formData);

      alert("Producto actualizado correctamente");
      navigate("/admin/productos");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="nuevo-producto">

      <h1>
        Editar Producto #{id}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="form-producto"
      >

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

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <textarea
          name="ingredientes"
          placeholder="Ingredientes"
          value={form.ingredientes}
          onChange={handleChange}
        />

        <input
          name="precio"
          type="number"
          value={form.precio}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
        />

        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
        >
          <option value="TORTA">
            Torta
          </option>

          <option value="CUPCAKE">
            Cupcake
          </option>

          <option value="GALLETA">
            Galleta
          </option>

          <option value="QUEQUE">
            Queque
          </option>

          <option value="POSTRE">
            Postre
          </option>
        </select>

        {form.tipo === "TORTA" && (
          <>
            <input
              type="number"
              name="cantidad_pisos"
              value={form.cantidad_pisos}
              onChange={handleChange}
            />

            <input
              type="number"
              name="cantidad_personas"
              value={form.cantidad_personas}
              onChange={handleChange}
            />

            <select
              name="forma_torta"
              value={form.forma_torta}
              onChange={handleChange}
            >
              <option value="CIRCULO">
                Círculo
              </option>

              <option value="CUADRADO">
                Cuadrado
              </option>

              <option value="RECTANGULO">
                Rectángulo
              </option>

              <option value="CORAZON">
                Corazón
              </option>

              <option value="PERSONALIZADA">
                Personalizada
              </option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={
                  form.permite_personalizacion_imagen
                }
                onChange={(e) =>
                  setForm(prev => ({
                    ...prev,
                    permite_personalizacion_imagen:
                      e.target.checked
                  }))
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
                setForm(prev => ({
                  ...prev,
                  permite_color_crema:
                    e.target.checked
                }))
              }
            />
            Permite color de crema
          </label>
        )}

        {form.tipo === "GALLETA" && (
          <input
            name="sabor_galleta"
            value={form.sabor_galleta}
            onChange={handleChange}
          />
        )}

        {form.tipo === "QUEQUE" && (
          <input
            name="sabor_queque"
            value={form.sabor_queque}
            onChange={handleChange}
          />
        )}

        <select
          name="tipo_venta"
          value={form.tipo_venta}
          onChange={handleChange}
        >
          <option value="CARRITO">
            Carrito
          </option>

          <option value="WHATSAPP">
            WhatsApp
          </option>
        </select>

        <button type="submit">
          Guardar cambios
        </button>

      </form>

    </div>
  );
}

export default EditarProducto;
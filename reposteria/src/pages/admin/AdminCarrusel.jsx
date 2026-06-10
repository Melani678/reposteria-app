import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./css/adminCarrusel.css";

function AdminCarrusel() {
  const [slides, setSlides] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dirty, setDirty] = useState(false);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  /* ───── LOAD ───── */
  useEffect(() => {
    cargarSlides();
  }, []);

  const cargarSlides = async () => {
    const res = await api.get("/carousel");
    setSlides(res.data);
  };

  /* ───── FILE ───── */
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  /* ───── ADD ───── */
  const addSlide = async () => {
    if (!file) return alert("Selecciona una imagen");

    const formData = new FormData();

    // IMPORTANTE: debe coincidir con tu backend Multer
    formData.append("imagen", file);

    await api.post("/carousel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFile(null);
    setPreview(null);
    fileRef.current.value = "";

    cargarSlides();
    setDirty(false);
  };

  /* ───── DELETE ───── */
  const deleteSlide = async (id) => {
    if (!window.confirm("¿Eliminar slide?")) return;

    await api.delete(`/carousel/${id}`);
    cargarSlides();
  };

  /* ───── MOVE ───── */
  const moveSlide = (index, dir) => {
    const newSlides = [...slides];
    const target = index + dir;

    if (target < 0 || target >= newSlides.length) return;

    [newSlides[index], newSlides[target]] = [
      newSlides[target],
      newSlides[index],
    ];

    // reorden local
    const reordered = newSlides.map((s, i) => ({
      ...s,
      orden: i,
    }));

    setSlides(reordered);
    setDirty(true);
  };

  /* ───── GUARDAR ORDEN EN BACKEND ───── */
  const saveOrder = async () => {
    const payload = slides.map((s, i) => ({
      id: s.id,
      orden: i,
    }));

    await api.patch("/carousel/reorder", payload);

    setDirty(false);
    cargarSlides();
  };

  return (
    <div className="edit-carousel-container">

      {/* HEADER */}
      <div className="edit-header">

        <button
          className="back-btn"
          onClick={() => navigate("/admin")}
        >
          ← Volver
        </button>

        <h2>Carrusel</h2>

        <span className="slide-count">
          {slides.length} slides
        </span>

      </div>

      {/* FORM */}
      <div className="form-card">

        <h3 className="form-title">
          Agregar nueva imagen
        </h3>

        <div
          className={`drop-zone ${preview ? "has-preview" : ""}`}
          onClick={() => fileRef.current?.click()}
        >
          {preview ? (
            <img src={preview} className="drop-preview" />
          ) : (
            <div className="drop-placeholder">
              <p>Click para subir imagen</p>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ display: "none" }}
        />

        <button
          className="add-btn"
          onClick={addSlide}
          disabled={!preview}
        >
          + Agregar al carrusel
        </button>

      </div>

      {/* LISTA */}
      <div className="slides-row">

        {slides
          .sort((a, b) => a.orden - b.orden)
          .map((s, idx) => (
            <div key={s.id} className="slide-card">

              <img
                src={s.imagen}
                alt="slide"
              />

              <div className="order-buttons">
                <button
                  className="move-btn"
                  onClick={() => moveSlide(idx, -1)}
                  disabled={idx === 0}
                >
                  ↑
                </button>

                <button
                  className="move-btn"
                  onClick={() => moveSlide(idx, 1)}
                  disabled={idx === slides.length - 1}
                >
                  ↓
                </button>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteSlide(s.id)}
              >
                Eliminar
              </button>

            </div>
          ))}
      </div>

      {/* SAVE BUTTON */}
      <div className="save-footer">

        <button
          className={`save-footer-btn ${
            dirty ? "save-footer-btn--pending" : ""
          }`}
          onClick={saveOrder}
          disabled={!dirty}
        >
          {dirty ? "Guardar cambios" : "Sin cambios"}
        </button>

      </div>

    </div>
  );
}

export default AdminCarrusel;
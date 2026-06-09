import { useEffect, useState } from "react";
import "./css/sabores.css";

import {
  getSabores,
  createSabor,
  updateSabor,
  deleteSabor
} from "../../services/saboresService";

function Sabores() {

  const [sabores, setSabores] = useState([]);
  const [nuevo, setNuevo] = useState("");
  const [editando, setEditando] = useState(null);
  const [editValue, setEditValue] = useState("");

  //  cargar desde backend
  useEffect(() => {
    cargarSabores();
  }, []);

  const cargarSabores = async () => {
    try {
      const data = await getSabores();
      setSabores(data);
    } catch (err) {
      console.error(err);
    }
  };

  //  crear
  const agregarSabor = async () => {
    console.log("click agregar", nuevo);
    if (!nuevo.trim()) return;

    try {
      await createSabor({ nombre: nuevo });
      setNuevo("");
      cargarSabores();
    } catch (err) {
      console.error(err);
    }
  };

  //  editar
  const startEdit = (sabor) => {
    setEditando(sabor.id_sabor_relleno);
    setEditValue(sabor.nombre);
  };

  const saveEdit = async () => {
    try {
      await updateSabor(editando, { nombre: editValue });
      setEditando(null);
      setEditValue("");
      cargarSabores();
    } catch (err) {
      console.error(err);
    }
  };

  //  eliminar
  const eliminar = async (id) => {
    const confirm = window.confirm("¿Eliminar este sabor?");
    if (!confirm) return;

    try {
      await deleteSabor(id);
      cargarSabores();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sabores-page">

      <h1>Sabores</h1>

      {/* agregar */}
      <div className="sabores-add">
        <input
          value={nuevo}
          placeholder="Nuevo sabor"
          onChange={(e) => setNuevo(e.target.value)}
        />
        <button onClick={(e) => {
          console.log("click directo", e);
          agregarSabor();
        }}>
          + Agregar
        </button>
      </div>

      {/* lista */}
      <div className="sabores-list">

        {sabores.map((sabor) => (
          <div key={sabor.id_sabor_relleno} className="sabor-card">

            {editando === sabor.id_sabor_relleno ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />

                <button onClick={saveEdit}>
                  Guardar
                </button>
              </>
            ) : (
              <>
                <span>{sabor.nombre}</span>

                <div className="actions">
                  <button onClick={() => startEdit(sabor)}>
                    Editar
                  </button>

                  <button onClick={() => eliminar(sabor.id_sabor_relleno)}>
                    Eliminar
                  </button>
                </div>
              </>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default Sabores;
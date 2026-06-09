import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./auth.css";

import {
  registerUser,
  loginUser
} from "../../services/authService";


import { FaEye, FaEyeSlash } from "react-icons/fa";
function Auth() {

  const navigate = useNavigate();
  const { login, usuario } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirm, setMostrarConfirm] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    confirmPassword: ""
  });
  const generarCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";

    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    setCaptcha(code);
    setCaptchaInput("");
  };
  // reset captcha al cambiar modo
  useEffect(() => {
    generarCaptcha();
  }, [isLogin]);
  // redirección si ya logueado
  useEffect(() => {
    if (usuario) {
      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [usuario, navigate]);
  
  // password strength
  const evaluarPassword = (password) => {

    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[^A-Za-z0-9]/.test(password);

    if (password.length < 8) {
      return "débil";
    }

    // fuerte
    if (
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneEspecial
    ) {
      return "fuerte";
    }

    // media
    if (
      (tieneMayuscula || tieneMinuscula) &&
      tieneNumero
    ) {
      return "media";
    }

    return "débil";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =========================
    // LOGIN
    // =========================
    if (isLogin) {

      try {

        const data = await loginUser({
          correo: formData.correo,
          password: formData.password
        });

        login(data.usuario, data.token);

        if (data.usuario.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } catch (error) {
        alert(
          error.response?.data?.message ||
          "Credenciales incorrectas"
        );
      }

      return;
    }

    // =========================
    // REGISTER
    // =========================

    if (captchaInput !== captcha) {
      alert("Código CAPTCHA incorrecto");
      generarCaptcha();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (evaluarPassword(formData.password) === "débil") {
      alert("La contraseña es demasiado débil");
      return;
    }

    try {

      await registerUser({
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        password: formData.password
      });

      alert("Usuario creado correctamente");
      setIsLogin(true);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Error al registrar"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-header">
          <h1>Dulce Encanto</h1>
          <p>Repostería artesanal hecha con amor</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          {/* REGISTER FIELDS */}
          {!isLogin && (
            <div className="row">
              <input
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
              />
              <input
                name="apellido"
                placeholder="Apellido"
                onChange={handleChange}
              />
            </div>
          )}

          {/* EMAIL */}
          <input
            name="correo"
            placeholder="Correo electrónico"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={mostrarPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />

            <span
              className="toggle-password"
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* PASSWORD STRENGTH */}
          {!isLogin && formData.password && (
            <>
              <p
                className={`password-strength ${evaluarPassword(
                  formData.password
                )}`}
              >
                Seguridad: {evaluarPassword(formData.password)}
              </p>

              <div className="password-rules">
                <small>✓ Mínimo 10 caracteres</small>
                <small>✓ Una letra mayúscula</small>
                <small>✓ Una letra minúscula</small>
                <small>✓ Un número</small>
                <small>✓ Un símbolo especial</small>
              </div>
            </>
          )}

          {/* CONFIRM PASSWORD */}
          {!isLogin && (
            <div className="password-wrapper">
              <input
                type={mostrarConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                onChange={handleChange}
              />

              <span
                className="toggle-password"
                onClick={() => setMostrarConfirm(!mostrarConfirm)}
              >
                {mostrarConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}

          
          {/* CAPTCHA SIMPLE */}
          {!isLogin && (
            <div className="captcha-box">
              <p className="captcha-code">{captcha}</p>

              <input
                type="text"
                placeholder="Escribe el código"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              />

              <button
                type="button"
                onClick={generarCaptcha}
                className="btn-refresh"
              >
                 Nuevo código
              </button>
            </div>
          )}
          {/* BUTTON */}
          <button type="submit" className="btn-auth">
            {isLogin ? "Ingresar" : "Crear cuenta"}
          </button>

        </form>

        {/* SWITCH */}
        <div className="auth-switch-bottom">

          {isLogin ? (
            <p>
              ¿No tienes cuenta?
              <span onClick={() => setIsLogin(false)}>
                {" "}Regístrate
              </span>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?
              <span onClick={() => setIsLogin(true)}>
                {" "}Inicia sesión
              </span>
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Auth;
import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );

  const login = (usuarioData, token) => {

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioData)
    );

    localStorage.setItem(
      "token",
      token
    );

    setUsuario(usuarioData);
  };

  const logout = () => {

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
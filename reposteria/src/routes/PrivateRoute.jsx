import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function PrivateRoute({ children }) {

  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/auth" />;
  }

  return children;
}

export default PrivateRoute;
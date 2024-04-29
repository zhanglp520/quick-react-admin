import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

const AuthRouter = () => {
  const auth = useAuth();
  if (!auth) {
    return <Navigate to="/login"></Navigate>;
  }
  return null;
};
export default AuthRouter;

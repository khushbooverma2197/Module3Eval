import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const PrivateRoute = ({ children, allowedRole }) => {
 const { isAuth, role } = useContext(AuthContext);
 if (!isAuth) return <Navigate to="/" />;
 if (allowedRole && role !== allowedRole) {
   return <Navigate to="/" />;
 }
 return children;
};
export default PrivateRoute;

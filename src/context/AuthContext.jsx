import { createContext, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
 const [isAuth, setIsAuth] = useState(
   JSON.parse(localStorage.getItem("auth")) || false
 );
 const [role, setRole] = useState(localStorage.getItem("role") || "");
 const login = (userRole) => {
   setIsAuth(true);
   setRole(userRole);
   localStorage.setItem("auth", true);
   localStorage.setItem("role", userRole);
 };
 const logout = () => {
   setIsAuth(false);
   setRole("");
   localStorage.removeItem("auth");
   localStorage.removeItem("role");
 };
 return (
<AuthContext.Provider value={{ isAuth, role, login, logout }}>
     {children}
</AuthContext.Provider>
 );
};

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import UpdateRestaurant from "./pages/UpdateRestaurant";
import PrivateRoute from "./components/PrivateRoute";
function App() {
 return (
<Routes>
<Route path="/" element={<Login />} />
<Route
       path="/admin/dashboard"
       element={
<PrivateRoute allowedRole="admin">
<AdminDashboard />
</PrivateRoute>
       }
     />
<Route
       path="/admin/restaurants/update/:id"
       element={
<PrivateRoute allowedRole="admin">
<UpdateRestaurant />
</PrivateRoute>
       }
     />
<Route
       path="/customers/dashboard"
       element={
<PrivateRoute allowedRole="customer">
<CustomerDashboard />
</PrivateRoute>
       }
     />
</Routes>
 );
}
export default App;

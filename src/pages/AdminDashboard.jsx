import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants, saveRestaurants } from "../utils/storage";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
 const [data, setData] = useState([]);
 const [form, setForm] = useState({
   restaurantName: "",
   address: "",
   type: "Rajasthani",
   parkingLot: true,
   image: "",
 });
 const navigate = useNavigate();
 useEffect(() => {
   const loadRestaurants = () => {
     setData(getRestaurants());
   };

   // Load initial data
   loadRestaurants();

   // Listen for storage changes
   const handleStorageChange = (e) => {
     if (e.key === 'evalData' || e.key === null) {
       loadRestaurants();
     }
   };

   window.addEventListener('storage', handleStorageChange);
   window.addEventListener('restaurantsUpdated', loadRestaurants);

   return () => {
     window.removeEventListener('storage', handleStorageChange);
     window.removeEventListener('restaurantsUpdated', loadRestaurants);
   };
 }, []);
 const getDefaultImage = (type) => {
   const images = {
     Rajasthani: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
     Gujarati: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
     Mughlai: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
     Jain: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
     Thai: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500",
     "North Indian": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
     "South Indian": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500",
   };
   return images[type] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500";
 };

 const handleAdd = () => {
   if (!form.restaurantName || !form.address) {
     alert("Empty form not allowed");
     return;
   }
   const finalImage = form.image || getDefaultImage(form.type);
   const newData = [
     ...data,
     { ...form, image: finalImage, restaurantID: Date.now() },
   ];
   saveRestaurants(newData);
   setData(newData);
   
   // Notify other components about the change
   window.dispatchEvent(new Event('restaurantsUpdated'));
   
   setForm({
     restaurantName: "",
     address: "",
     type: "Rajasthani",
     parkingLot: true,
     image: "",
   });
   alert("Restaurant Added Successfully!");
 };
 const handleDelete = (id) => {
   if (!confirm("Are you sure want to delete?")) return;
   const updated = data.filter((el) => el.restaurantID !== id);
   saveRestaurants(updated);
   setData(updated);
   
   // Notify other components about the change
   window.dispatchEvent(new Event('restaurantsUpdated'));
   
   alert("Deleted Successfully");
 };
 return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        
        <div className="add-restaurant-section">
          <h3 className="section-title">Add New Restaurant</h3>
          <div className="form-container">
            <div className="form-group">
              <label>Restaurant Name</label>
              <input 
                type="text"
                placeholder="Enter restaurant name" 
                value={form.restaurantName}
                onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} 
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input 
                type="text"
                placeholder="Enter full address" 
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })} 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Cuisine Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option>Rajasthani</option>
                  <option>Gujarati</option>
                  <option>Mughlai</option>
                  <option>Jain</option>
                  <option>Thai</option>
                  <option>North Indian</option>
                  <option>South Indian</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Parking Available</label>
                <select value={form.parkingLot} onChange={(e) => setForm({ ...form, parkingLot: e.target.value === "true" })}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Image URL (Optional)</label>
              <input 
                type="text"
                placeholder="Enter image URL or leave blank for default" 
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })} 
              />
            </div>
            
            <button className="btn-add" onClick={handleAdd}>
              <span>+ Add Restaurant</span>
            </button>
          </div>
        </div>

        <div className="restaurants-section">
          <h3 className="section-title">All Restaurants ({data.length})</h3>
          <div className="restaurants-grid">
            {data.length === 0 ? (
              <div className="empty-state">
                <p>No restaurants added yet. Add your first restaurant above!</p>
              </div>
            ) : (
              data.map((el) => (
                <RestaurantCard
                  key={el.restaurantID}
                  data={el}
                  isAdmin
                  onDelete={handleDelete}
                  onUpdate={(id) => navigate(`/admin/restaurants/update/${id}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
 );
};
export default AdminDashboard;

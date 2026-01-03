import { useParams, useNavigate } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/storage";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/UpdateRestaurant.css";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurants = getRestaurants();
  const target = restaurants.find((el) => el.restaurantID == id);
  const [form, setForm] = useState(target);

  const handleUpdate = () => {
    if (!confirm("Confirm Update?")) return;
    const updated = restaurants.map((el) =>
      el.restaurantID == id ? form : el
    );
    saveRestaurants(updated);
    
    // Notify other components about the change
    window.dispatchEvent(new Event('restaurantsUpdated'));
    
    alert("Updated Successfully");
    navigate("/admin/dashboard");
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="update-restaurant">
      <Navbar />
      <div className="update-container">
        <h2 className="update-title">Update Restaurant</h2>
        
        <div className="update-form">
          <div className="form-group">
            <label>Restaurant Name</label>
            <input
              type="text"
              value={form.restaurantName}
              onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
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
            <label>Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          {form.image && (
            <div className="image-preview">
              <label>Preview</label>
              <img src={form.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}

          <div className="button-group">
            <button className="btn-update" onClick={handleUpdate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Update Restaurant
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRestaurant;

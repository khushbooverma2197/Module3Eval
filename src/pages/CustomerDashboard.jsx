import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../utils/storage";
import "../styles/CustomerDashboard.css";

const CustomerDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterParking, setFilterParking] = useState("All");

  useEffect(() => {
    const loadRestaurants = () => {
      const restaurants = getRestaurants();
      setData(restaurants);
      setFilteredData(restaurants);
    };

    // Load initial data
    loadRestaurants();

    // Listen for storage changes (when admin adds/updates/deletes restaurants)
    const handleStorageChange = (e) => {
      if (e.key === 'evalData' || e.key === null) {
        loadRestaurants();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-page updates
    window.addEventListener('restaurantsUpdated', loadRestaurants);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('restaurantsUpdated', loadRestaurants);
    };
  }, []);

  useEffect(() => {
    let filtered = [...data];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== "All") {
      filtered = filtered.filter((restaurant) => restaurant.type === filterType);
    }

    // Parking filter
    if (filterParking !== "All") {
      filtered = filtered.filter(
        (restaurant) => restaurant.parkingLot === (filterParking === "Yes")
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, filterType, filterParking, data]);

  return (
    <div className="customer-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Discover Restaurants</h2>
          <p className="dashboard-subtitle">Find your favorite cuisine and explore new places</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search restaurants or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="filter-item">
              <label>Cuisine Type</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option>All</option>
                <option>Rajasthani</option>
                <option>Gujarati</option>
                <option>Mughlai</option>
                <option>Jain</option>
                <option>Thai</option>
                <option>North Indian</option>
                <option>South Indian</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Parking</label>
              <select value={filterParking} onChange={(e) => setFilterParking(e.target.value)}>
                <option>All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="results-info">
          <p>Showing {filteredData.length} restaurant{filteredData.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="restaurants-grid">
          {filteredData.length === 0 ? (
            <div className="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>No restaurants found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredData.map((el) => (
              <RestaurantCard key={el.restaurantID} data={el} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

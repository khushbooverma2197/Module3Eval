import "../styles/RestaurantCard.css";

const RestaurantCard = ({ data, isAdmin, onDelete, onUpdate }) => {
  const defaultImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500";
  
  return (
    <div className="restaurant-card">
      <div className="card-image-container">
        <img 
          src={data.image || defaultImage} 
          alt={data.restaurantName}
          className="card-image"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <div className="card-badge">
          <span className="badge-type">{data.type}</span>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="restaurant-name">{data.restaurantName}</h3>
        <p className="restaurant-address">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {data.address}
        </p>
        
        <div className="card-details">
          <div className="detail-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>{data.type} Cuisine</span>
          </div>
          
          <div className="detail-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Parking: {data.parkingLot ? "Available" : "Not Available"}</span>
          </div>
        </div>
        
        {isAdmin && (
          <div className="card-actions">
            <button className="btn-update" onClick={() => onUpdate(data.restaurantID)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Update
            </button>
            <button className="btn-delete" onClick={() => onDelete(data.restaurantID)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;

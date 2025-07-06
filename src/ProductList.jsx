import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true); // Show plants by default
  const [addedToCart, setAddedToCart] = useState({});

  // [plantsArray] — keeping your existing array as is
  const plantsArray = [ /* your existing categories and plant objects */ ];

  // Navbar inline styles
  const styleObj = { /* same as your existing */ };
  const styleObjUl = { /* same */ };
  const styleA = { /* same */ };

  // Event Handlers
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    setShowPlants(false);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowPlants(true);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true
    }));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={styleObj}>
        {/* ... same navbar as yours */}
      </div>

      {/* Main Display */}
      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        showPlants && (
          <div className="product-grid">
            {plantsArray.map((categoryObj, idx) => (
              <div key={idx}>
                <h2 style={{ color: '#333' }}>{categoryObj.category}</h2>
                <div className="product-category-grid">
                  {categoryObj.plants.map((plant, i) => (
                    <div key={i} className="product-card">
                      <h3>{plant.name}</h3>
                      <img src={plant.image} alt={plant.name} />
                      <p>{plant.description}</p>
                      <p>Cost: {plant.cost}</p>
                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default ProductList;

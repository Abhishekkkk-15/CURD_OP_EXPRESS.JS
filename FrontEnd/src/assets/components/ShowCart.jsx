import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShowCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const logOrNot = useSelector(state => state.login.logOrNot)
  const [update ,setUpdate] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}CURD/showCart`, 
          {},
          { withCredentials: true }
        );
        setCartItems(response.data.products);
      } catch (error) {
        console.log("Error while fetching the cart data", error);
        setMessage('Failed to load cart items.');
      }
    })();
  }, [update]);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}CURD/removeFromCart`, 
        { productId },
        { withCredentials: true }
      );
      setMessage('Item removed from cart!');
      setUpdate(!update)
    } catch (error) {
      setMessage('Failed to remove item from cart.');
    }

    setTimeout(() => setMessage(''), 2000);
  };


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0).toFixed(2); // Convert to string with two decimal places
  };

if(!logOrNot){
  return  <h1 style={{width:'100%', display:'flex',justifyContent:'center' }}>
  <Link to="/login" className='mt-5 text-center' >Login first</Link>
</h1>
}

  return (
    <div className="container mt-4">
      {message && (
        <div 
          className={`alert ${message.includes('Failed') ? 'alert-danger' : 'alert-success'}`}
          role="alert"
        >
          {message}
        </div>
      )}

      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item, i) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={i}>
              <div className="card shadow-sm h-100">
                <div className="d-flex align-items-center">
                  <img 
                    src={item.productId.thumbnail} 
                    alt={item.productId.title} 
                    className="card-img-top img-fluid"
                    style={{ maxHeight: '150px', objectFit: 'cover', width: '100%' }} 
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1rem' }}>{item.productId.title}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.productId.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                    <div>
                      <strong>&#x20b9;{(item.productId.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                  <button 
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleRemoveItem(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12 mt-4">
            <h4>Total Price: &#x20b9;{calculateTotal()} <Link to="/buy"><button>Buy now</button></Link></h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCart;

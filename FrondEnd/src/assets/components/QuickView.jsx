// QuickView.js
import React from 'react';
import './QuickView.css'; // Import the CSS for the modal
import { Link } from 'react-router-dom';

const QuickView = ({ product, closeModal, addToCart }) => {
  if (!product) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={closeModal}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.title}</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={product.thumbnail || "https://via.placeholder.com/600x400"}
                  className="img-fluid"
                  alt={product.title}
                  style={{ objectFit: 'contain', height: 'auto' }}
                />
              </div>
              <div className="col-md-6">
                <h4>Price: ₹{product.price}</h4>
                <p>{product.description}</p>
                <div className="d-flex justify-content-between">
                  <Link to="/buy"><button className="btn btn-primary">Buy Now</button></Link>
                  <button className="btn btn-success" onClick={() => addToCart(product._id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;

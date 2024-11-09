import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./CSS/showPro.css"

const ShowProduct = () => {
  const productDetails = useSelector(state => state.product.productDetails);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-10 col-12 d-flex flex-column flex-md-row">
          {/* Product Image Section */}
          <div className="col-md-6 product-image-container">
            <div className="product-image-wrapper">
              <img
                src={productDetails.thumbnail || "https://via.placeholder.com/1200x1200"}
                className="img-fluid product-image"
                alt={productDetails.title}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-md-6 mt-4 mt-md-0 ps-md-5">
            <h1 className="text-dark">{productDetails.title}</h1>
            <h3 className="text-muted">Price: &#x20b9;{productDetails.price}</h3>

            {/* Product Ratings */}
            <div className="d-flex align-items-center my-3">
              <span className="text-warning">⭐⭐⭐⭐⭐</span>
              <span className="ms-2 text-muted">(1000 reviews)</span>
            </div>

            {/* Product Description */}
            <p className="lead">{productDetails.description}</p>

            {/* Buttons Section */}
            <div className="d-flex flex-column gap-3">
              <Link to="/buy">
                <button className="btn btn-lg btn-primary btn-block">Buy Now</button>
              </Link>
              <button className="btn btn-lg btn-outline-secondary btn-block">Add to Cart</button>
            </div>

            {/* Optional: Additional info or seller information */}
            <div className="mt-4">
              <h5 className="text-muted">Seller Info</h5>
              <p className="text-muted">Sold by: <strong>AJIO Seller</strong></p>
              <p className="text-muted">Ships from: <strong>AJIO</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;

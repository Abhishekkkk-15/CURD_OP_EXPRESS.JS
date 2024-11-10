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

          <div className="col-md-6 product-image-container">
            <div className="product-image-wrapper">
              <img
                src={productDetails.thumbnail || "https://via.placeholder.com/1200x1200"}
                className="img-fluid product-image"
                alt={productDetails.title || "Product title"}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>


          <div className="col-md-6 mt-4 mt-md-0 ps-md-5">
            <h1 className="text-dark">{productDetails.title || "Product title"}</h1>
            <h3 className="text-muted">Price: &#x20b9;{productDetails.price || "Product price"}</h3>


            <div className="d-flex align-items-center my-3">
              <span className="text-warning">⭐⭐⭐⭐⭐</span>
              <span className="ms-2 text-muted">(1000 reviews)</span>
            </div>


            <p className="lead">{productDetails.description || "Product descripition"}</p>


            <div className="d-flex flex-column gap-3">
              <Link to="/buy">
                <button className="btn btn-lg btn-primary btn-block">Buy Now</button>
              </Link>
              <button className="btn btn-lg btn-outline-secondary btn-block">Add to Cart</button>
            </div>


            <div className="mt-4">
              <h5 className="text-muted">Seller Info</h5>
              <p className="text-muted">Sold by: <strong>{productDetails.sellerName || "AJIO SELLER"}</strong></p>
              <p className="text-muted">Ships from: <strong>AJIO</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;

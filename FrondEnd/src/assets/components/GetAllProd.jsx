import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import PlcaeOrder from './PlcaeOrder';
import { Link } from 'react-router-dom';

function GetAllProd() {
const loginSt = useSelector(state => state.login.loginSt);
const [product,setProduct] = useState([])
const [error,setError] = useState(false)
const [loading,setLoading] = useState(false)
const [del,setDelete] = useState(false)
useEffect(() => {
  (async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:8000/CURD");
      setProduct(response.data);  
      setLoading(false)
      setError(false)
    } catch (error) {
      setError(true)  
      console.error("Error fetching data:", error);  
    }
  })(); 
}, [del,]);

const deleteprod = async(id) =>{
  setDelete(!del)
  try {
    const response = await axios.delete(`http://localhost:8000/CURD/${id}`)
  } catch (error) {
    console.log("Error while deleting product",error)
    setError(true)
    return <h1>No Data</h1>
  }
}

console.log(product.length == 0);


if (loading) {
  return <h1 className='container text-center text-muted my-5'>Fetching Data...</h1>;
}

if (error) {
  return <h1 className='container text-center text-danger my-5'>Server Error! Unable to fetch data.</h1>;
}

if (!Array.isArray(product) || product.length === 0) {
  return <h1 className='container text-center text-muted my-5'>No Products Available</h1>;
}

  return (
<div className="container mt-4">
      <h1 className="mb-5 text-center">Our Products</h1>
      <div className="row">
        {product.map((prod, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <img 
                src={prod.thumbnail || "https://via.placeholder.com/300"} 
                className="card-img-top" 
                alt={prod.title} 
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{prod.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: &#x20b9;{prod.price}</h6>
                <p className="card-text text-truncate">{prod.description}</p>
              </div>
              <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                <Link to="/buy">
                  <button className="btn btn-outline-primary btn-sm">Buy Now</button>
                </Link>
                <button 
                  className="btn btn-outline-danger btn-sm" 
                  onClick={() => deleteprod(prod._id)} 
                  disabled={!loginSt}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default GetAllProd

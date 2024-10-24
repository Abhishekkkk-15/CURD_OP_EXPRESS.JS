import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import PlcaeOrder from './PlcaeOrder';
import { Link } from 'react-router-dom';

function GetAllProd() {
const loginSt = useSelector(state => state.login.loginSt);
console.log(loginSt)
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
}, [del]);

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


if(loading){
    return <h1 className='container text-center'>Fetching Data.......</h1>
}

if(error){
    return <h1>Server Error!!!!</h1>
}

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Products</h1>
      <div className="row">
        {
          product.map((prod, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <img src={prod.image} className="card-img-top" alt={prod.title} />
                <div className="card-body">
                  <h5 className="card-title">{prod.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Price: &#x20b9;{prod.price}</h6>
                  <p className="card-text">{prod.description}</p>
                 <Link to="/buy"><button className="btn btn-primary ms-2" type="submit">Buy Now</button></Link>
                  <button className="btn btn-primary ms-2" onClick={()=>deleteprod(prod._id)} disabled={!loginSt}>Delete</button>
                </div>
              </div>
            </div>  
          ))
        }
      </div>
    </div>
  )
}

export default GetAllProd

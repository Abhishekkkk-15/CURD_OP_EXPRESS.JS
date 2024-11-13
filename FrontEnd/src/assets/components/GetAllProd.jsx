import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogOrNot, setUserInfo } from '../../app/Slices/loginSlice';
import { setProductt } from '../../app/Slices/productSlice';
import QuickView from './QuickView'; 

function GetAllProd() {
  const userInfo = useSelector(state => state.login.userInfo)  || false ;
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [del, setDelete] = useState(false);
  const [showModal, setShowModal] = useState(false); // To control Quick View Modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product for Quick View
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}CURD`,{withCredentials: true});
        setProduct(response.data);
        setLoading(false);
        setError(false);
        // console.log(product[1]._id)
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    })();
  }, [del]);

  useEffect(()=>{
    (async()=>{
      try {
       const {data} = await axios.post(`${import.meta.env.VITE_API_URL}CURD/userInfo`,{},{withCredentials: true}); //this helps to send cookies to backend server
       dispatch(setUserInfo(data?.userInfo))
       dispatch(setLogOrNot(true))
      } catch (error) {
        console.log("error",error)
      }
    })();
  },[])

  const deleteprod = async(id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}CURD/${id}`,{withCredentials:true});
    setDelete(!del);
    } catch (error) {
      console.log("Error while deleting product", error);
      setError(true);
    }
  };

  const showProduct = (prod) => {
    setSelectedProduct(prod);
    setShowModal(true);
  };

  const setprod = (index) => {
    dispatch(setProductt(product[index]));
  };

  const closeModal = () => {
    setShowModal(false); // Close Quick View modal
  };

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const addToCart = async (productId, quantity) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}CURD/addToCart`,
        { productId, quantity },
        { withCredentials: true }
      );
      setMessage('Item added to cart successfully!');
      setMessageType('success'); // For success message
      setTimeout(() => {
        setMessage(''); // Hide the message after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage('Failed to add item to cart.');
      setMessageType('error'); // For error message
      setTimeout(() => {
        setMessage(''); // Hide the message after 2 seconds
      }, 2000);
    }
  };

  if (loading) {
    return <h1 className="container text-center text-muted my-5">Fetching Data...</h1>;
  }

  if (error) {
    return <h1 className="container text-center text-danger my-5">Server Error! Unable to fetch data.</h1>;
  }

  if (!Array.isArray(product) || product.length === 0) {
    return <h1 className="container text-center text-muted my-5">No Products Available</h1>;
  }  

  return (
    <>
    <p className='mb-5 text-center text-truncate'>{message}</p>
    <div className="container mt-4">
      <h1 className="mb-5 text-center">Our Products</h1>
      <div className="row">
        {product.map((prod, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <img
                src={prod.thumbnail || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={prod.title || "Product title"}
                style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => showProduct(prod)} // Open Quick View on image click
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{prod.title || "Product title"}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: &#x20b9;{(prod.price).toFixed(2) || "Product Price"}</h6>
                <p className="card-text text-truncate">{prod.description}</p>
              </div>
              <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                <Link to="/showProduct">
                  <button className="btn btn-outline-primary btn-sm" onClick={()=>setprod(index)}>More Details</button>
                </Link>
                 {userInfo?.isAdmin ? <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteprod(prod._id,1)}
                  >
                    Delete
                  </button> :
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => addToCart(prod._id,1)}
                  >
                    Add to Cart
                  </button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {showModal && selectedProduct && (
        <QuickView 
          product={selectedProduct} 
          closeModal={closeModal} 
          addToCart={addToCart} 
        />
      )}
    </div>
    </>
  );
}

export default GetAllProd;

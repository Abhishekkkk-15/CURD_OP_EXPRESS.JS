import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RequestAdmin from './RequestAdmin';
import { Link } from 'react-router-dom';

function AddProd() {
let userInfo = useSelector(state=> state.login.userInfo)
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    description: ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(false);
  const [checkAdmin, setAdmin] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('thumbnail', thumbnail);

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}CURD/`, formData,{
        withCredentials: true, headers: { "Content-Type": "multipart/form-data" }
      });
      // const {data} = await axios.post("https://funecommerceserver.onrender.com/CURD/", formData,{
      //   withCredentials: true, headers: { "Content-Type": "multipart/form-data" }
      // });
      
      setError(false);
      alert("Product Added Successfully!!")
    } catch (err) {
      console.error("Error while adding product", err);
      setError(true);
    }
  };

useEffect(()=>{
  (async()=>{
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}CURD/admin-route`,{},{withCredentials: true}); //this helps to send cookies to backend server
      setAdmin(true)
    } catch (error) {
      setAdmin(false)
      console.log("error",error)
    }
  })();
},[])

if (!checkAdmin) {
  return <h1 className='text-center mt-5'>You are not authorized to Add Products send Admin request <Link to="/requestAdmin">Admin</Link></h1>;
  }

if(userInfo?.writePermission){
  <RequestAdmin userInfo={userInfo}/>
}  

  return (
    <>
      <div className='container mt-5'>
        <form onSubmit={handleSubmit} className='form'>
          <h1 className='mb-4 text-center'>Add Your Product</h1>

          <div className='mb-3'>
            <input
              className='form-control'
              placeholder='Upload Thumbnail'
              type='file'
              name='thumbnail'
              onChange={handleFileChange} 
              required
            />
          </div>

          <div className='mb-3'>
            <input
              className='form-control'
              placeholder='Enter Id'
              type='text'
              name='sellerName'
              value={userInfo?.userName}
              readOnly
            />
          </div>

          <div className='mb-3'>
            <input
              className='form-control'
              placeholder='Enter Title'
              type='text'
              name='title'
              value={product?.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <input
              className='form-control'
              placeholder='Enter Price'
              type='text'
              name='price'
              value={product?.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <input
              className='form-control'
              placeholder='Enter Category'
              type='text'
              name='category'
              value={product?.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <textarea
              className='form-control'
              placeholder='Enter Description'
              name='description'
              value={product?.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type='submit' className='btn btn-primary btn-block'>
            Add Product
          </button>
        </form>

        {error && <h1 className='text-danger text-center mt-3'>Error while Adding Product. Please try again.</h1>}
      </div>
    </>
  );
}

export default AddProd;

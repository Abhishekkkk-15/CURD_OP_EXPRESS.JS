import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AddProd() {
  const [product, setProduct] = useState({
    id: '',
    title: '',
    price: '',
    category: '',
    description: ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(false);
  const loginSt = useSelector(state => state.login.loginSt);

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
    formData.append('id', product.id);
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('thumbnail', thumbnail);

    try {
      await axios.post("http://localhost:8000/CURD", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setError(false);
    } catch (err) {
      console.error("Error while adding product", err);
      setError(true);
    }
  };

  if (!loginSt) {
    return <h1 className='text-center mt-5'>You are not authorized to Add Products</h1>;
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
              name='id'
              value={product.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <input
              className='form-control'
              placeholder='Enter Title'
              type='text'
              name='title'
              value={product.title}
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
              value={product.price}
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
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <textarea
              className='form-control'
              placeholder='Enter Description'
              name='description'
              value={product.description}
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

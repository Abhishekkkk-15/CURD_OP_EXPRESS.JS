import React, { useState } from 'react'
import axios from 'axios'
// import "../componentsCss/addprod.css"

function AddProd() {

const [product,setProduct] = useState([])
const [error, setError] = useState(false)

const handleChange = (e) => {
  const { name, value } = e.target;
  setProduct((prevProduct) => ({
    ...prevProduct,
    [name]: value,
  }));
}


const handleSubmit = async() =>{
 try {
   const addprod = axios.post("http://localhost:8000/CURD",product)
   console.log("Created")
   setError(false)
 } catch (error) {
  console.log(error)
  setError(true)
 }
  
}

  return (
    <>
         <div className='container mt-5'>
      <form onSubmit={handleSubmit} className='form'>
        <h1 className='mb-4 text-center'>Add Your Product</h1>

        <div className='mb-3'>
          <input
            className='form-control'
            placeholder='Enter Id'
            type='text'
            name='id'
            value={product.id}
            onChange={handleChange}
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
          />
        </div>

        <div className='mb-3'>
          <textarea
            className='form-control'
            placeholder='Enter Description'
            name='description'
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type='submit' className='btn btn-primary btn-block' onClick={handleSubmit}>
          Add Products
        </button>
      </form>

      {error && <h1 className='text-danger text-center mt-3'>Error while Adding Product. Please try again.</h1>}
    </div>
    </>
  )
}

export default AddProd

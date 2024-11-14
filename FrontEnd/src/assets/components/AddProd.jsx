// AddProd.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RequestAdmin from './RequestAdmin';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 5rem auto;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  &:focus {
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.h1`
  color: #d9534f;
  text-align: center;
  margin-top: 1rem;
`;

function AddProd() {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    description: ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(false);
  const [checkAdmin, setAdmin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
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
      await axios.post(`${import.meta.env.VITE_API_URL}CURD/`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });
      setError(false);
      alert("Product Added Successfully!");
    } catch (err) {
      console.error("Error while adding product", err);
      setError(true);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}CURD/admin-route`, {}, { withCredentials: true });
        setAdmin(true);
      } catch (error) {
        setAdmin(false);
        console.log("Authorization error:", error);
      }
    })();
  }, []);

  if (!checkAdmin) {
    return (
      <ErrorText>
        You are not authorized to add products. Send an Admin request <Link to="/requestAdmin">here</Link>.
      </ErrorText>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Add Your Product</Title>

        <Input
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
          required
        />

        <Input
          type="text"
          name="sellerName"
          value={userInfo?.userName}
          readOnly
          placeholder="Seller ID"
        />

        <Input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Enter Title"
          required
        />

        <Input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter Price"
          required
        />

        <Input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Enter Category"
          required
        />

        <Textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter Description"
          rows="4"
          required
        />

        <SubmitButton type="submit">Add Product</SubmitButton>
      </Form>

      {error && <ErrorText>Error while adding product. Please try again.</ErrorText>}
    </Container>
  );
}

export default AddProd;

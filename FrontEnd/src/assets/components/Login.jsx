// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setLogOrNot } from '../../app/Slices/loginSlice';
import UserInfo from "./User";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  text-align: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
  & a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({});
  const [loginStatus, setLoginStatus] = useState('');

  const userInfo = useSelector((state) => state.login.userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}CURD/login`, login, {
        withCredentials: true,
      });
      if (data?.error) {
        setLoginStatus(data?.error);
        return;
      }
      dispatch(setUserInfo(data.userInfo));
      dispatch(setLogOrNot(true));
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  if (userInfo) {
    return <UserInfo />;
  }

  return (
    <Container>
      <Card>
        <Title>{loginStatus || 'Login'}</Title>
        <Form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Email or Username"
            name="email"
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <Button type="submit">Login</Button>
        </Form>
        <SignUpLink>
          Don't have an account? <Link to="/reg">Sign up</Link>
        </SignUpLink>
      </Card>
    </Container>
  );
}

export default Login;

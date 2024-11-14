import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setLogOrNot } from '../../app/Slices/loginSlice';
import axios from 'axios';
import styled from 'styled-components';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loginSt = useSelector((state) => state.login.loginSt);
  const logOrNot = useSelector((state) => state.login.logOrNot);
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}CURD/userInfo`,
          {},
          { withCredentials: true }
        );
        dispatch(setUserInfo(data?.userInfo));
        dispatch(setLogOrNot(true));
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);

  return (
    <NavbarContainer>
      <NavbarBrand to="/">E-Commerce</NavbarBrand>

      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        ☰
      </ToggleButton>

      <NavLinks $isOpen={isOpen}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add">Add Product</NavLink>
        <NavLink to="/dashboard">DashBoard</NavLink>

        <CartButton to="/ShowCart">
          🛒 Cart
        </CartButton>

        {userInfo ? (
          <Link to="/userInfo">
            <ProfileImage
              src={
                userInfo?.avatar ||
                'https://i.pinimg.com/736x/15/2d/4b/152d4b093faa2ea3af8e098516fbf037.jpg'
              }
              alt="Profile"
            />
          </Link>
        ) : (
          <CartButton to="/login">Login</CartButton>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

// Styled Components
const NavbarContainer = styled.nav`
  background-color: #343a40;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const NavbarBrand = styled(Link)`
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #bbb;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 3.5rem;
    left: 0;
    right: 0;
    background-color: #343a40;
    flex-direction: column;
    padding: 1rem 0;
    z-index: 1;
  }
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #bbb;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #28a745;
  color: #28a745;
  padding: 0.25rem 0.5rem;
  margin-top:8px;
  margin-left: 1rem;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #28a745;
    color: white;
  }
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 1rem;
  border: 2px solid white;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default Navbar;

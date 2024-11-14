// UserInfo.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../app/Slices/loginSlice';
import Logout from './Logout';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const AvatarContainer = styled.div`
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;

const UserName = styled.h5`
  font-size: 1.5rem;
  color: #333;
  margin: 1rem 0;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0.3rem 0;
  & span {
    color: #333;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  font-style: italic;
  color: #888;
`;

function UserInfo() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}CURD/userInfo`, {}, { withCredentials: true });
        dispatch(setUserInfo(data?.userInfo));
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    })();
  }, [dispatch]);

  return (
    <Container>
      <Card>
        <AvatarContainer>
          <Avatar
            src={userInfo?.avatar || "https://i.pinimg.com/736x/15/2d/4b/152d4b093faa2ea3af8e098516fbf037.jpg"}
            alt="Avatar"
          />
        </AvatarContainer>
        <UserName>{userInfo?.userName || "User Name"}</UserName>
        <InfoText>Email: <span>{userInfo?.email || "User Email"}</span></InfoText>
        <InfoText>Member: <span>{userInfo?.writePermission ? 'Premium' : 'Non-Premium'}</span></InfoText>
        <Footer>
          <small>Thank you for visiting!</small>
        </Footer>
        <Logout />
      </Card>
    </Container>
  );
}

export default UserInfo;

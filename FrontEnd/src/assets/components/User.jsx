import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../app/Slices/loginSlice';
import Logout from './Logout';
import axios from 'axios';

function UserInfo() {

const dispatch = useDispatch()
const userInfo = useSelector(state => state.login.userInfo);  
useEffect(()=>{
  (async()=>{
    try {
     const {data} = await axios.post("https://funecommerceserver.onrender.com/CURD/userInfo",{},{withCredentials: true}); //this helps to send cookies to backend server
     dispatch(setUserInfo(data?.userInfo))
    } catch (error) {
      console.log("error",error)
    }
  })();
},[])

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body text-center">
        
          <div className="avatar-container mb-4">
            {userInfo?.avatar ? (
              <img 
                src={userInfo.avatar} 
                alt="Avatar" 
                className="rounded-circle" 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
              />
            ) : (
              <div className="text-secondary">
                <img 
                  src="https://i.pinimg.com/736x/15/2d/4b/152d4b093faa2ea3af8e098516fbf037.jpg" 
                  alt="Avatar" 
                  className="rounded-circle" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
              </div>
            )}
          </div>

         
          <h5 className="card-title mb-3">{userInfo?.userName || "User Name"}</h5>
          <div className="info-container mb-3">
            <p className="card-text text-muted">Email: <span className="text-dark">{userInfo?.email || "User Email"}</span></p>
            <p className="card-text text-muted">Member: <span className="text-dark">{userInfo?.writePermission ? 'Premium ' : 'Non-Premium '}</span></p>
          </div>
        </div>

      
        <div className="card-footer text-center">
          <small className="text-muted font-italic">Thank you for visiting!</small>
        <Logout />
        </div>
      </div>

    </div>
      
      
    </>
  );
}

export default UserInfo;

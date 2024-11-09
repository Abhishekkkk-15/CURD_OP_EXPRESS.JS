import React from 'react';
import { useSelector } from 'react-redux';
import Logout from './Logout';

function UserInfo() {
  const userinfo = useSelector(state => state.login.userInfo);
  console.log("User Information:", userinfo);

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body text-center">
        
          <div className="avatar-container mb-4">
            {userinfo?.avatar ? (
              <img 
                src={userinfo.avatar} 
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
                <span>No Avatar Available</span>
              </div>
            )}
          </div>

         
          <h5 className="card-title mb-3">{userinfo?.username}</h5>
          <div className="info-container mb-3">
            <p className="card-text text-muted">Email: <span className="text-dark">{userinfo?.email}</span></p>
            <p className="card-text text-muted">Role: <span className="text-dark">{userinfo?.writePermission ? 'Admin' : 'User'}</span></p>
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

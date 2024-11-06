import React from 'react';
import { useSelector } from 'react-redux';
import Logout from './Logout';

function UserInfo() {
    const userinfo = useSelector(state => state.login.userInfo);
    console.log("in", userinfo);

    return (
        <>
            <div className="card text-center mt-5 shadow-lg border-0" style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="card-header bg-primary text-white font-weight-bold">
                    User Information
                </div>
                <div className="card-body p-4">
                    {/* Avatar Section */}
                    <div className="mb-3">
                        {userinfo?.avatar ? (
                            <img 
                                src={userinfo.avatar} 
                                alt="Avatar" 
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                            />
                        ) : (
                            <div className="text-secondary">No Avatar Available</div>
                        )}
                    </div>

                    {/* User Information */}
                    <h5 className="card-title mb-3 text-secondary">Name: <span className="text-dark">{userinfo?.username}</span></h5>
                    <p className="card-text text-secondary">Email: <span className="text-dark">{userinfo?.email}</span></p>
                    <p className="card-text text-secondary">Role: <span className="text-dark">{userinfo?.writePermission}</span></p>
                </div>
                <div className="card-footer text-muted font-italic">
                    Thank you for visiting!
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Logout />
            </div>
        </>
    );
}

export default UserInfo;

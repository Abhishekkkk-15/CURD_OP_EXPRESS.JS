import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './Logout';

function UserInfo() {
    // const dispatch = useDispatch()
    const userinfo = useSelector(state => state.login.userInfo)
    console.log("in",userinfo)
    return (<>
        <div className="card text-center mt-5">
            <div className="card-header">
                User Information
            </div>
            <div className="card-body">
                <h5 className="card-title">Name : {userinfo?.username}</h5>
                <p className="card-text">Email : {userinfo?.email}</p>
                <p className="card-text">MemberShip :  {userinfo?.writePermission}</p>
            </div>
            <div className="card-footer text-muted">
                Thank you for visiting!
            </div>
        </div>
        <Logout />
    </>
    );
}

export default UserInfo;

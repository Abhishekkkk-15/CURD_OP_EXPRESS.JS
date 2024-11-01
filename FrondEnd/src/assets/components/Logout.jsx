import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserStatus } from '../../app/Slices/loginSlice';

function Logout() {
    const dispatch = useDispatch();
    const handleLogout = () =>{
        
            window.location.reload();
        
    }
    return (
        <div className="text-center mt-5">
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Logout;

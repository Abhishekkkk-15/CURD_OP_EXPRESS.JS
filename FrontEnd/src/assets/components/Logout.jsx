import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setUserStatus } from '../../app/Slices/loginSlice';
import axios from 'axios';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.login.userInfo)
    const dispatch = useDispatch();
    const handleLogout = async () =>{
     try {
        await axios.post("http://localhost:8000/CURD/logOut",{},{withCredentials:true}) 
           dispatch(setUserInfo(null))
     } catch (error) {
        console.log(error)
     }
    }

    const navi = () =>{
        navigate('/login')
    }
    return (
        <div className="text-center mt-5">
            {userInfo ? <button className="btn btn-danger" onClick={handleLogout}>
               LogOut
            </button> : 
             <button className="btn btn-danger" onClick={navi}>
             Login
          </button>}
        </div>
    );
}

export default Logout;

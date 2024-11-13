import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo ,setLogOrNot} from '../../app/Slices/loginSlice';
import axios from 'axios';


function Navbar() {
  const loginSt = useSelector((state) => state.login.loginSt);
  const logOrNot = useSelector((state) => state.login.logOrNot);
  const userInfo = useSelector((state) => state.login.userInfo);
  const dispatch = useDispatch()

  useEffect(()=>{
    (async()=>{
      try {
       const {data} = await axios.post(`${import.meta.env.VITE_API_URL}CURD/userInfo`,{},{withCredentials: true}); //this helps to send cookies to backend server
       dispatch(setUserInfo(data?.userInfo))
       dispatch(setLogOrNot(true))
      } catch (error) {
        console.log("error",error)
      }
    })();
  },[])

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
       
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>

       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/add">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                DashBoard
              </Link>
            </li>
          </ul>

         
          <Link to="/ShowCart">
            <button className="btn btn-outline-success ms-2 " type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
          </Link>

         
          {userInfo ? (
            <div className="d-flex align-items-center ms-2">
              <Link to="/userInfo" className="text-white ms-2">
                <img
                  src={userInfo?.avatar || 'https://i.pinimg.com/736x/15/2d/4b/152d4b093faa2ea3af8e098516fbf037.jpg'}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '35px', height: '35px', objectFit: 'cover', border: '2px solid white' }}
                />
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-outline-success ms-3" type="button">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  
  );
}

export default Navbar;
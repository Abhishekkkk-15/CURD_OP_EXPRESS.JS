import React, { useState, useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserStatus } from '../../app/Slices/loginSlice';


function Login(props) {

  const dispatch = useDispatch();
  const [login, setLogin] = useState({}); // Initialize as an object
  const loginSt = useSelector((state) => state.login.loginSt);
  console.log("loginst", loginSt);
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState({});
  const [WritePer, setWritePermission] = useState(false);
  const [logout, setLogout] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const registerUser = await axios.post("http://localhost:8000/CURD/login", login);
    setLoginStatus(registerUser?.data);
    console.log(registerUser.status);
    if(registerUser?.status == 404){
      return <h1>{registerUser?.data}</h1>
    } 
    setLogout(true)
    setWritePermission(registerUser?.data?.writePermission); 
    props.setLogin(true)
  };  

  useEffect(() => {
    if (WritePer !== false) {
      dispatch(setUserStatus(WritePer));
      console.log(WritePer);
    }
  }, [WritePer]); 

const handleLogout = () =>{
   window.location.href = '/login';
}

if(logout){
  return <button className='flex justify-content-center mt-5 align-items-center'onClick={handleLogout}>logOut</button>
}

  return (
    <div className='container justify-content-center align-items-center'>
      <div className=' w-100 p-3 align-middle bg-g'>
        {<label className="col-sm-2 col-form-label">{loginStatus?.message || loginStatus?.error}</label>}
        <form onSubmit={handleLogin}>
          <div className="mb-3 row">
            <div className="col-sm-5">
              <input type="text" placeholder='Email or UserName' className="form-control-plaintext" name="email" onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-sm-5">
              <input type="password" placeholder="Password" className="form-control" name="password" onChange={handleChange} />
            </div>
          </div>
          <button className='btn btn-primary btn-block'>Login</button>
        </form>
      <p className='mt-3'><Link to={"/reg"}>Sing in?</Link></p>
      </div>
    </div>
  );
}

export default Login;

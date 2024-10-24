import React, { useState, useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserStatus } from '../../app/Slices/loginSlice';
import Logout from './Logout';


function Login(props) {

  const dispatch = useDispatch();
  const [login, setLogin] = useState({}); // Initialize as an object
  const loginSt = useSelector((state) => state.login.loginSt);
  // console.log("loginst", loginSt);
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState([]);
  const [WritePer, setWritePermission] = useState(false);
  const [logout, setLogout] = useState(false)
  const [userInfo,setUserInfo] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        const { data } = await axios.post("http://localhost:8000/CURD/login", login);

        if (data?.error) {
            console.log(data.error);
            setLoginStatus(data?.error);
            return;
        }
        setUserInfo(data?.userInfo);
        setLogout(true);
        setWritePermission(data?.writePermission); 
        props.setLogin(true);
        
        // const setinfo = await dispatch(setUserInfo(data?.userInfo))
       
        console.log('Login Status:', data);
        console.log('User Info:',userInfo);
    } catch (error) {
        console.error("An error occurred during login:", error);
    }
}; 
const uinfo = useSelector((state) => state.login.userInfo);
console.log(uinfo)
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
  return <Logout/>
}

  return (
    <div className='container justify-content-center align-items-center'>
      <div className=' w-100 p-3 align-middle bg-g'>
        {<label className="col-sm-2 col-form-label">{loginStatus}</label>}
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

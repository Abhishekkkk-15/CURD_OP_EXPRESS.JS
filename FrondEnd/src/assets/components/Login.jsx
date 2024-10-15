import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

const [login,setLogin] = useState([])
const [loginStatus,setLoginStatus] = useState({})
const [WritePermission,setWritePermission] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevProduct) => ({
         ...prevProduct,
        [name]: value,
     }));
    }

    const handleLogin = async (event) =>{
        event.preventDefault()
        const registerUser = await axios.post("http://localhost:8000/CURD/login",login)
        setLoginStatus(registerUser?.data)
        setWritePermission(loginStatus?.WritePermission)
        console.log(loginStatus?.message)
        console.log(loginStatus?.writePermission)
    }   

  return (
    <div>
      <div className='container w-100 p-3 align-middle bg-g'>
    {<label  className="col-sm-2 col-form-label">{loginStatus?.message}:permission {WritePermission}</label>}
        <form onSubmit={handleLogin}>
        <div className="mb-3 row">
    <div className="col-sm-5">
      <input type="text" placeholder='Email or UserName' className="form-control-plaintext"  name="email" onChange={handleChange} />
    </div>
  </div>
  <div className="mb-3 row">
    <div className="col-sm-5">
      <input type="password" placeholder="Password" className="form-control"  name="password"  onChange={handleChange} />
    </div>
  </div>
  <button type='submit' className='btn btn-primary btn-block' onClick={handleLogin}>Login</button>
  </form>

  <p className='mt-3'><Link to={"/reg"} >Sign up?</Link></p>
    </div>
    </div>
  )
}

export default Login

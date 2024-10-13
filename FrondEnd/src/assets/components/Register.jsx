import React, { useState } from 'react'
import axios from 'axios';

function Register() {

const [reg,setReg] = useState([])
const [userRegi, setuserRegi] = useState(false)


const handleChange = (e) => {
        const { name, value } = e.target;
        setReg((prevProduct) => ({
         ...prevProduct,
        [name]: value,
     }));
    }
    
    
    const handleRegister = async (event) =>{
        event.preventDefault()
        const registerUser = await axios.post("http://localhost:8000/CURD/reg",reg)
        if(registerUser){
        setuserRegi(true)
        }
}

  return (
    <div className='container w-100 p-3 align-middle bg-g'>
    {userRegi? <label  className="col-sm-2 col-form-label">User Registred   </label>: ""}

        <form onSubmit={handleRegister}>
        <div className="mb-3 row">
    <label  className="col-sm-2 col-form-label">UserName</label>
    <div className="col-sm-5">
      <input type="text"  className="form-control-plaintext"  name="userName" onChange={handleChange} />
    </div>
  </div>
        <div className="mb-3 row">
    <label  className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-5">
      <input type="text"  className="form-control-plaintext"  name="email" onChange={handleChange} />
    </div>
  </div>
  <div className="mb-3 row">
    <label  className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-5">
      <input type="password" className="form-control"  name="password"  onChange={handleChange} />
    </div>
  </div>
  <button type='submit' onClick={handleRegister} className='btn btn-primary btn-block' >Register</button>
  </form>
    </div>
  )
}

export default Register

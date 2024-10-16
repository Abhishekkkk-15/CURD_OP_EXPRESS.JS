import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function PlcaeOrder(props) {
const login = props.login

    return (
    <div className='container'>
      {login?<h1>Buy now</h1>:<h1><Link to={"/login"} className='mt-5 text-center'>Login first</Link></h1>}
    </div>
  )
}

export default PlcaeOrder

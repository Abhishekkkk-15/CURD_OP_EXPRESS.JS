import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
function Navbar(props) {

  const loginSt = useSelector((state) => state.login.loginSt);
  const loginstt = toString(loginSt)
  let prLogin = props.login;
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/add" >Add Product</Link>
          </li>
        </ul>
        <form className="d-flex" role="search">
        {props.login? <Link  to="/userinfo"><button className="btn btn-outline-success" type="submit">User</button></Link>:""}
          <Link to="/login"><button className="btn btn-outline-success ms-3" type="submit">{props.login? "Logout":"Login"}</button></Link>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Navbar

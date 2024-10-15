import { useEffect, useState } from 'react'
import './App.css'
import AddProd from './assets/components/AddProd.jsx'
import GetAllProd from './assets/components/GetAllProd'
import Navbar from './assets/components/Navbar'
import {Routes,Route } from 'react-router-dom';
import Register from './assets/components/Register.jsx'
import Login from './assets/components/Login.jsx'

function App() {
  return (
 <div>
  <Navbar/>
  <Routes>
   <Route path={"/"} element={<GetAllProd/>}/>
   <Route path={"/add"} element={<AddProd/>}/>
   <Route path={"/login"} element={<Login/>}/>
   <Route path={"/reg"} element={<Register/>}/>
  </Routes>
 </div>
  )
}

export default App

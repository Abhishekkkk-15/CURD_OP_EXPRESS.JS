import { useEffect, useState } from 'react'
import './App.css'
import AddProd from './assets/components/AddProd.jsx'
import GetAllProd from './assets/components/GetAllProd'
import Navbar from './assets/components/Navbar'
import {Routes,Route } from 'react-router-dom';
import Register from './assets/components/Register.jsx'
import Login from './assets/components/Login.jsx'
import PlcaeOrder from './assets/components/PlcaeOrder.jsx'

function App() {
  const [login,setLogin] = useState(false)
  return (
 <div>
  <Navbar login={login}/>
  <Routes>
   <Route path={"/"} element={<GetAllProd/>}/>
   <Route path={"/add"} element={<AddProd/>}/>
   <Route path={"/login"} element={<Login setLogin={setLogin} />} />
   <Route path={"/reg"} element={<Register/>}/>
   <Route path={"/buy"} element={<PlcaeOrder login={login} />}/>
  </Routes>
 </div>
  )
}

export default App

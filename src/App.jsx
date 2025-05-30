import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import Login from './Pages/Login/Login'
import Registration from './Pages/Registration/Registartion'
import Dashboard from './Pages/Dashboard/Dashboard'
import Nav from './Components/Nav/Nav'
import Home from './Pages/Home/Home'

function App() {
  const navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState(() => {
    const userData = localStorage.getItem("currentUserData")
    return userData ? JSON.parse(userData) : undefined;
  });
  
  const onLogout = () => {
    localStorage.removeItem("currentUserData")
    setCurrentUserData(undefined);
  }

  return (
    <>
    <Nav currentUserData={currentUserData} onLogout={onLogout} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={currentUserData == undefined ? <Login onGettingUserData={(currentUserData) => {setCurrentUserData(currentUserData); navigate("/dashboard"); localStorage.setItem("currentUserData", JSON.stringify(currentUserData))}} /> : null} />
      <Route path="registration" element={currentUserData == undefined ? <Registration /> : null} />
      <Route path="dashboard" element={currentUserData != undefined ? <Dashboard currentUserData={currentUserData} /> : null} />
    </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import Login from './Pages/Login/Login'
import Registration from './Pages/Registration/Registartion'
import Nav from './Components/Nav/Nav'
import Home from './Pages/Home/Home'
import Manager from './Pages/Managers/Manager'
import Employee from './Pages/Employees/Employee'

function App() {
  const navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState(() => {
    const userData = localStorage.getItem("currentUserData")

    return userData ? JSON.parse(userData) : undefined;
  });
  
  const onLogout = () => {
    fetch('https://localhost:7049/api/Account/Logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem('refreshToken'),
        userId: currentUserData.user.id
      })
    })
    .then(result => {});

    localStorage.removeItem("currentUserData")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    navigate("/");
    setCurrentUserData(undefined);
  }

  const onLogin = (currentUserData) => {
    setCurrentUserData(currentUserData);
    navigate("/");

    localStorage.setItem("currentUserData", JSON.stringify(currentUserData))
    localStorage.setItem("accessToken", currentUserData.token.accessToken)
    localStorage.setItem("refreshToken", currentUserData.token.refreshToken)
  }

  return  <>
    <Nav currentUserData={currentUserData} onLogout={onLogout} />

    <div className='wrapper'>
      <Routes>
        <Route path="/" element={<Home currentUserData={currentUserData} />} />
        <Route path="login" element={currentUserData == undefined ? <Login onGettingUserData={onLogin} /> : null} />
        <Route path="registration" element={currentUserData == undefined ? <Registration /> : null} />
        <Route path="manager" element={currentUserData != undefined ? <Manager currentUserData={currentUserData} /> : null} />
        <Route path="employee" element={currentUserData != undefined ? <Employee currentUserData={currentUserData} /> : null} />
      </Routes>
    </div>
    </>
}

export default App

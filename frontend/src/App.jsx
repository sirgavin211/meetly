import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CreateHangout from './pages/CreateRoom/CreateHangout.jsx';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="createhangout" element={<CreateHangout />} />
    </Routes>
  )
}

export default App

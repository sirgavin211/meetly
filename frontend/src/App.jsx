import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CreateHangout from './pages/CreateHangout/CreateHangout.jsx';
import Hangout from './pages/Hangout/Hangout.jsx';

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="createhangout" element={<CreateHangout />} />
      <Route path="hangout" element={<Hangout />} />
    </Routes>
  )
}

export default App

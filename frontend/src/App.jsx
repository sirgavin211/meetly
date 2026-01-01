import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  )
}

export default App

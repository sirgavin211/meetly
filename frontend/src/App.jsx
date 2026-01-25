import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CreateHangout from './pages/CreateHangout/CreateHangout.jsx';
import Hangout from './pages/Hangout/Hangout.jsx';
import JoinHangout from './pages/JoinHangout/JoinHangout.jsx';


function App() {
  const data = {
    "name": "Maragame Udon Hang",
    "date": "1/2/26",
    "locations": [
      {
        "address": "Maragame Udon (Alameda)",
        "arriveAt": "12:30 PM",
        "departAt": "5:30 PM"
      },
      {
        "address": "Evan's House",
        "arriveAt": "5:30 PM",
        "departAt": "8:30 PM"
      },
      {
        "address": "Evan's House",
        "arriveAt": "5:30 PM",
        "departAt": "8:30 PM"
      },
      {
        "address": "Evan's House",
        "arriveAt": "5:30 PM",
        "departAt": "8:30 PM"
      },
    ],
    "optional_notes": "Bring money",
    "include_host": false,
    "multiple_locations": false,
    "host_id": "eb421iofwe41oawl"
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="createhangout" element={<CreateHangout />} />
      <Route path="hangout" element={<Hangout data={data} />} />
      <Route path="joinhangout" element={<JoinHangout />} />
    </Routes>

  )
}

export default App

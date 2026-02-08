

import './SignIn.css';
import { useAuth } from '../../data/auth/AuthContext';
import CoffeeImage from '../../assets/images/better.png';
import Navbar from '../../components/Navbar/Navbar'; // Adjust path as needed
import { useState } from 'react';


export default function SignIn() {



  const { isLoggedIn, login } = useAuth();
  const { username, updateUsername } = useState("");

  const handleSignIn = () => {
    login(); // This will set isLoggedIn to true
  };

  return (
    <>
      <Navbar page="Home" />

      <div className="home">
        <div className="content">
          <div className='empty-card'>
            <h2>Sign In </h2>
            <p>Welcome back you've <br /> been missed</p>

            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                updateUsername(e.target.value);

              }}
            />


          </div>
        </div>

        <div className="background-elements">
          <img className="coffee-image" src={CoffeeImage} alt="man drinking coffee on couch" />
        </div>
      </div>
    </>
  );
}




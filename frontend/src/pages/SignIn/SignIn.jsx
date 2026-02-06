

import './SignIn.css';
import { useAuth } from '../../data/auth/AuthContext';
import { Link } from 'react-router-dom';
import CoffeeImage from '../../assets/images/better.png';
import Navbar from '../../components/Navbar/Navbar'; // Adjust path as needed


export default function SignIn() {
  const { isLoggedIn, login } = useAuth();

  const handleSignIn = () => {
    login(); // This will set isLoggedIn to true
  };

  return (
    <>
      <Navbar page="Home" />

      <div className="home">
        <div className="content">
        </div>

        <div className="background-elements">
          <img className="coffee-image" src={CoffeeImage} alt="man drinking coffee on couch" />
        </div>
      </div>
    </>
  );
}




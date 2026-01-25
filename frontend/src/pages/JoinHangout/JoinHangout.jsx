

import Navbar from '../../components/Navbar/Navbar';
import CoffeeImage from '../../assets/images/better.png';
import "./JoinHangout.css";

export default function JoinHangout() {


  return (
    <>

      <Navbar page='Join Hangout' />

      <div className="join_page">


        <div className="content">
          <p></p>
        </div>

        <div className="background-elements">
          <img className="coffee-image" src={CoffeeImage} alt="man drinking cofee on couch" />
        </div>


      </div>




    </>
  );

}

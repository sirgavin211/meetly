
import { useState } from "react";
import Navbar from '../../components/Navbar/Navbar';
import CoffeeImage from '../../assets/images/better.png';
import "./JoinHangout.css";

function JoinHangout() {


  const [code, setCode] = useState("");
  const code_regex = /^\d{3} \d{3}$/;
  const [show_error, enableMessage] = useState(false);


  function send_join_request() {
    if (code_regex.test(code) === false) {
      enableMessage(true);
      return;
    }
  }


  return (
    <>

      <Navbar page='Join Hangout' />

      <div className="join_page">


        <div className="content">
          <input
            type="text"
            onChange={(e) => {
              setCode(e.target.value);

            }}
          />
          <input
            type="button"
            value="Submit"

          />

          {show_error &&
            <p>Properly enter a code (ex. 123 456)</p>
          }
        </div>

        <div className="background-elements">
          <img className="coffee-image" src={CoffeeImage} alt="man drinking cofee on couch" />
        </div>


      </div>




    </>
  );

}





export default JoinHangout

import "./CreateHangout.css";
import CoffeeImage from "../../assets/images/better.png";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";

export default function CreateHangout(){

    const [hangout_data, setData] = useState({
        name: "",
        date: "",
        location: "",
        optional_notes: "",
        include_host: false,
    });


    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    return (
        <>
            <Navbar page="Create Hangout"/>

            <div className="createhangout">
                
                <div className="content">
                    <h1>Create Hangout</h1>
                    <p>Plan easy hangouts, split the bill, and <br /> just show up.</p>

                    <section className="form">
                        <div className="card">
                            <label>What's your hangout?</label>
                            <input type="text" placeholder="Enter your hangout name"/>

                                <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    // checked={enabled}
                                    // onChange={(e) => {
                                    //     setEnabled(e.target.checked)
                                    //     updateHasFamily(e.target.checked);
                                    // }}
                                />
                                Include me (the host) in the hangout
                            </label>

                            <div className="line"></div>
                            <div className="bar">
                                <input type="button" className="continue_button" value="Continue"></input>
                            </div>

                            <small className="caption">A memorable name for your hangout.</small>
                        </div>
                    </section>
                </div>

                <div className="background-elements">
                    <img className="coffee-image" src={CoffeeImage} alt="man drinking cofee on couch"/>
                </div>
            </div>
        </>
    )
}
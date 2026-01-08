import "./CreateHangout.css";
import CoffeeImage from "../../assets/images/better.png";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useProfile } from "../../data/useProfile";

export default function CreateHangout(){

    //hangout data json structure
    const [hangout_data, setData] = useState({
        name: "",
        date: "",
        location: "",
        optional_notes: "",
        include_host: false,
    });

    //get current profile data
    const profile = useProfile();
    //numbers to keep track of each parameter
    const [form_parameter, setFormParameter] = useState(0);

    //to check if they filled out their profile
    const [profileFilled, setFilled] = useState(false);

    //the checkbox
    const [includeHost, setIncludeHost] = useState(false);

    //store data in the input text
    const [parameter, setParameter] = useState("");

    function continueForm(data){
        
        if(profile.first_name === "" || profile.last_name === "" || profile.age <= 5 || profile.first_name === "Guest"){
            setFilled(true);
            return;
        }

        setFormParameter(form_parameter + 1);
    }

    useEffect(() => {
        if(!profile) return;
    }, [profile]);

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
                            {(form_parameter == 0) ? <label>What's your hangout?</label> : ""}
                            <input type="text" placeholder="Enter your hangout name" value={parameter} onChange={(e) => setParameter(e.target.value)}/>

                                <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    checked={includeHost}
                                    onChange={(e) => {
                                        setIncludeHost(e.target.checked)
                                    }}
                                />
                                Include me (the host) in the hangout
                            </label>

                            <div className="line"></div>
                            <div className="bar">
                                <input type="button" className="continue_button" value="Continue" onClick={continueForm}></input>
                            </div>

                            {
                                profileFilled ? 
                                <small className="warning">Fill out your profile first please!</small>
                                :
                                <small className="caption">A memorable name for your hangout.</small>
                            }
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
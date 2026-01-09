import "./CreateHangout.css";
import CoffeeImage from "../../assets/images/better.png";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useProfile } from "../../data/useProfile";

export default function CreateHangout() {

    //hangout data json structure
    const [hangout_data, setHangoutData] = useState({
        name: "",
        date: "",
        locations: [""],
        optional_notes: "",
        include_host: false,
        single_location: false,
    });

    //get current profile data
    const profile = useProfile();
    //numbers to keep track of each parameter
    const [form_parameter, setFormParameter] = useState(0);

    //the checkbox
    const [checked, setChecked] = useState(false);

    //store data in the input text
    const [parameter, setParameter] = useState("");

    //check if they filled out the input box
    const [caption, setCaption] = useState("A memorable name for your hangout.");
    const [blink, setBlink] = useState(false);

    function continueForm() {

        if (profile.first_name === "" || profile.last_name === "" || profile.age <= 5 || profile.first_name === "Guest") {
            setBlink(true);
            setCaption("Please fill out your profile first!");
            return;
        }

        if (parameter === "") {
            setBlink(true);
            setCaption("Please type something into the box!");
            return;
        }


        setBlink(false);

        if (form_parameter == 0) {
            setHangoutData(prev => ({
                ...prev,
                name: parameter,
                include_host: checked
            }));
            setParameter("");
            setChecked(false);
        }


        setFormParameter(form_parameter + 1);
    }

    function backForm() {

        if (form_parameter === 1) {
            setParameter(hangout_data.name);
            setChecked(hangout_data.include_host);
        }

        setFormParameter(form_parameter - 1);
    }

    useEffect(() => {
        if (!profile) return;
    }, [profile]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    return (
        <>
            <Navbar page="Create Hangout" />

            <div className="createhangout">

                <div className="content">



                    <h1>Create Hangout</h1>
                    <p>Plan easy hangouts, split the bill, and <br /> just show up.</p>



                    <section className="form">

                        <div className="card">
                            {form_parameter == 0 && <label>What's your hangout?</label>}
                            {form_parameter == 1 && <label>Where's your hangout?</label>}
                            <input
                                type="text"
                                placeholder={
                                    form_parameter === 0 ? "Enter your hangout name" :
                                        form_parameter === 1 && "Enter a location"
                                }
                                value={parameter}
                                onChange={(e) => {
                                    if (form_parameter === 0) {
                                        setParameter(e.target.value);
                                    }

                                    if (form_parameter === 1) {
                                        if (hangout_data.locations.length == 0) {
                                            setHangoutData(prev => ({
                                                ...prev,
                                                locations: [prev.locations, e.target.value]
                                            }));
                                        } else {
                                            setHangoutData(prev => ({
                                                ...prev,
                                                locations: [e.target.value, ...prev.locations.slice(1)]
                                            }))
                                        }
                                    }
                                }}
                            />



                            {(form_parameter === 1 && checked) && (
                                <>
                                    <div style={{
                                        maxHeight: '100px',
                                        overflowY: 'auto',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        paddingRight: '10px'
                                    }}>
                                        {hangout_data.locations.slice(1).map((location, i) => {
                                            return (
                                                <div key={i} style={{ position: 'relative', marginBottom: '10px' }}>
                                                    <input
                                                        type="text"
                                                        value={location}
                                                        onChange={(e) => {
                                                            setHangoutData(prev => ({
                                                                ...prev,
                                                                locations: prev.locations.map((loc, index) =>
                                                                    (i + 1) === index ? e.target.value : loc
                                                                )
                                                            }))
                                                        }}
                                                        placeholder="Enter a location"
                                                    ></input>
                                                    <button
                                                        onClick={() => {
                                                            setHangoutData(prev => ({
                                                                ...prev,
                                                                locations: prev.locations.filter((_, index) => index !== (i + 1))
                                                            }));
                                                        }}
                                                        className="remove_button"
                                                    >
                                                        <svg
                                                            viewBox="0 0 16 16"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            )
                                        })}

                                    </div>

                                    <button
                                        className="add_location"
                                        onClick={() => {
                                            console.log("added location")
                                            setHangoutData(prev => ({
                                                ...prev,
                                                locations: [...prev.locations, ""]
                                            }))
                                        }}
                                    >
                                        + Add
                                    </button>
                                </>
                            )}

                            <label className="checkboxLabel">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                        setChecked(e.target.checked)
                                    }}
                                />
                                {form_parameter === 0 && "Include me (the host) in the hangout"}
                                {form_parameter === 1 && "Add multiple locations"}
                            </label>

                            <div className="line"></div>
                            <div className="bar">
                                {form_parameter > 0 && (
                                    <button
                                        className="back_button"
                                        onClick={backForm}
                                    >
                                        <svg data-v-4a498d72="" data-v-b7694956="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-105e4578="">
                                            <path
                                                data-v-4a498d72=""
                                                d="M10.0503 12.0006L15 16.9504L13.5858 18.3646L7.22178 12.0006L13.5858 5.63675L15 7.05095L10.0503 12.0006Z"
                                                fill="currentColor" />
                                        </svg>
                                    </button>
                                )}
                                <input type="button" className={`continue_button ${form_parameter > 0 ? 'smaller' : ''}`} value="Continue" onClick={continueForm}></input>
                            </div>

                            {
                                blink ?
                                    <small className="warning">{caption}</small>
                                    :
                                    <small className="caption">{caption}</small>
                            }
                        </div>
                    </section>
                </div>

                <div className="background-elements">
                    <img className="coffee-image" src={CoffeeImage} alt="man drinking cofee on couch" />
                </div>
            </div>
        </>
    )
}
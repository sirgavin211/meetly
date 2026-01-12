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
        locations: [
            { address: "", arriveAt: "", departAt: "" }
        ],
        optional_notes: "",
        include_host: false,
        multiple_locations: false,
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



    function timeToMinutes(timeStr) {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return hours * 60 + minutes;
    }

    async function createHangout() {
        try {
            const response = await fetch("http://localhost:5000/api/createhangout", {
                method: "POST",
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({
                    ...hangout_data,
                    host_id: getOrCreateUserId()
                })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Hangout created! Code:', data.code);
                // Show success, redirect, etc.
            }
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }


    function getOrCreateUserId() {
        let userId = localStorage.getItem('userId');

        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem('userId', userId);
        }

        return userId;
    }




    //continuing to parameters (what, where, when)
    function continueForm() {


        //check whether profile and parameters are filled
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



        //going from what to where
        if (form_parameter == 0) {
            setHangoutData(prev => ({
                ...prev,
                name: parameter,
                include_host: checked
            }));
            setParameter(hangout_data.locations[0].address);
            setChecked(hangout_data.multiple_locations);
            setBlink(false);
            setCaption("An address or general location for your hangout");
        }



        //going from where to when
        if (form_parameter == 1) {
            setHangoutData(prev => ({
                ...prev,
                locations: [
                    prev.locations[0],
                    ...prev.locations.slice(1).filter(location => location.address.trim() !== "")
                ]
            }));

            setCaption("A date and time for your hangout");
            setParameter(hangout_data.date);

        }

        //sending the full hangout_data
        if (form_parameter == 2) {
            const allFilled = hangout_data.locations.every(location =>
                location.arriveAt !== "" && location.departAt !== ""
            );

            if (!allFilled) {
                setBlink(true);
                setCaption("Please fill out the times for each location.")
                return;
            }

            const correctTimes = hangout_data.locations.every(location =>
                timeToMinutes(location.arriveAt) < timeToMinutes(location.departAt)
            );

            if(!correctTimes){
                setBlink(true);
                setCaption("Please make sure the arrival times are before the departure times")
                return;
            }

            setBlink(false);
            setCaption("A date and time for your hangout.");
            
            createHangout();
        }



        //limits
        if (form_parameter < 2) setFormParameter(form_parameter + 1);
    }




    //going back parameters
    function backForm() {


        //going from where to what
        if (form_parameter === 1) {
            setParameter(hangout_data.name);
            setChecked(hangout_data.include_host);
            setCaption("A memorable name for your hangout");
            setHangoutData(prev => ({
                ...prev,
                locations: [
                    prev.locations[0],  // Keep first one
                    ...prev.locations.slice(1).filter(location => location.address.trim() !== "")  // Filter by .address
                ]
            }));
        }

        if (form_parameter === 2) {
            setParameter(hangout_data.locations[0].address)
            setCaption("An address or general location for your hangout.")
            setBlink(false)
            setChecked(hangout_data.multiple_locations)
        }

        setFormParameter(form_parameter - 1);
    }



    //check for profile's existence
    useEffect(() => {
        if (!profile) return;
    }, [profile]);


    //locks scrolling
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


                        {/* main card */}
                        <div className="card">


                            {form_parameter == 0 && <label>What's your hangout?</label>}
                            {form_parameter == 1 && <label>Where's your hangout?</label>}
                            {form_parameter == 2 && <label>When's your hangout?</label>}


                            <input
                                type={
                                    form_parameter !== 2 ? "text" :
                                        "date"
                                }
                                placeholder={
                                    form_parameter === 0 ? "Enter your hangout name" :
                                        form_parameter === 1 ? "Enter a location" :
                                            form_parameter === 2 ? "Select a date" :
                                                ""
                                }
                                value={parameter}
                                onChange={(e) => {

                                    if (form_parameter === 1) {
                                        setHangoutData(prev => ({
                                            ...prev,
                                            locations: [
                                                { ...prev.locations[0], address: e.target.value },
                                                ...prev.locations.slice(1)
                                            ]
                                        }))
                                    }

                                    if (form_parameter === 2) {
                                        setHangoutData(prev => ({
                                            ...prev,
                                            date: e.target.value
                                        }))
                                    }
                                    setParameter(e.target.value);
                                }}
                            />




                            {/* rendering multiple locations */}
                            {(form_parameter === 1 && checked) && (
                                <>
                                    <div style={{
                                        maxHeight: '100px',
                                        overflowY: 'auto',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        paddingRight: '10px',
                                        overflowX: 'hidden'
                                    }}>
                                        {hangout_data.locations.slice(1).map((location, i) => {
                                            return (
                                                <div key={i} style={{ position: 'relative', marginBottom: '10px' }}>
                                                    <input
                                                        type="text"
                                                        value={location.address}
                                                        onChange={(e) => {
                                                            setHangoutData(prev => ({
                                                                ...prev,
                                                                locations: prev.locations.map((loc, index) =>
                                                                    (i + 1) === index
                                                                        ? { ...loc, address: e.target.value }
                                                                        : loc
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
                                                locations: [...prev.locations, { address: "", arriveAt: "", departAt: "" }]
                                            }))
                                        }}
                                    >
                                        + Add
                                    </button>
                                </>
                            )}


                            {form_parameter !== 2 && (
                                <label className="checkboxLabel">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(e) => {
                                            setChecked(e.target.checked)

                                            if (form_parameter == 1) {
                                                setHangoutData(prev => ({
                                                    ...prev,
                                                    multiple_locations: e.target.checked
                                                }))
                                            }
                                        }}
                                    />
                                    {form_parameter === 0 && "Include me (the host) in the hangout"}
                                    {form_parameter === 1 && "Add multiple locations"}
                                </label>
                            )}

                            {form_parameter === 2 && (
                                <>
                                    <div className="location-cards-scroll" style={{
                                        maxHeight: '100px',
                                        overflowY: 'auto',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        paddingRight: '10px',
                                        overflowX: 'hidden'

                                    }}>
                                        {hangout_data.locations.map((location, i) => {
                                            return (
                                                <div key={i} className="location_card">
                                                    <small>{location.address}</small>

                                                    <div className="times">
                                                        <input
                                                            type="time"
                                                            placeholder="Arrive"
                                                            value={location.arriveAt}
                                                            onChange={(e) => {
                                                                setHangoutData(prev => ({
                                                                    ...prev,
                                                                    locations: prev.locations.map((loc, index) =>
                                                                        index === i
                                                                            ? { ...loc, arriveAt: e.target.value }
                                                                            : loc
                                                                    )
                                                                }))
                                                            }}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder="Leave"
                                                            value={location.departAt}
                                                            onChange={(e) => {
                                                                setHangoutData(prev => ({
                                                                    ...prev,
                                                                    locations: prev.locations.map((loc, index) =>
                                                                        index === i
                                                                            ? { ...loc, departAt: e.target.value }
                                                                            : loc
                                                                    )
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}


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
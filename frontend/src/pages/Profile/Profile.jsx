import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import CoffeeImage from "../../assets/images/better.png";
import { useProfile } from "../../data/useProfile.js";
import {
    updateFirstName,
    updateLastName,
    updateAge,
    updateHasFamily,
    addChild,
    removeChild,
    addAdult,
    removeAdult,
    updateAdult,
    updateChild
} from "../../data/profilemanager.js"


function Profile() {


    const profile = useProfile();

    if (!profile) return null;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [enabled, setEnabled] = useState(false);
    const [children, setChildren] = useState([]);
    const [adults, setAdults] = useState([]);


    useEffect(() => {

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        if (!profile) return;

        setFirstName(profile.first_name ?? "");
        setLastName(profile.last_name ?? "");
        setAge(profile.age ?? "");
        setEnabled(profile.hasFamily ?? false);

        setChildren(profile.family?.children ?? []);
        setAdults(profile.family?.adults ?? []);

    }, [profile]);


    useEffect(() => {
        console.log("children state:", children.length);
    }, [children]);

    return (
        <>
            <Navbar page="Profile" />
            <div className="profile">

                <div className="content">
                    <header className="home-header">
                        <h2>My Profile</h2>
                    </header>

                    <div className="profile-sections">
                        <div className="profile-left">
                            <p>First Name</p>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    updateFirstName(e.target.value);
                                }}
                            />

                            <p>Last Name</p>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    updateLastName(e.target.value);
                                }}
                            />

                            <p>Age</p>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => {
                                    setAge(e.target.value);
                                    updateAge(e.target.value);
                                }}
                            />

                            <label>
                                <input
                                    type="checkbox"
                                    checked={enabled}
                                    onChange={(e) => {
                                        setEnabled(e.target.checked)
                                        updateHasFamily(e.target.checked);
                                    }}
                                />
                                Add family
                            </label>
                        </div>

                        <div className="profile-right">
                            {enabled ?
                                <>
                                    <p>Family</p>
                                    <small>Who usually comes with you?</small>
                                    <p>👤 You {age >= 18 ? "(adult)" : ""}</p>

                                    <div className="children-list">
                                        {children.map((child, i) => (
                                            <div key={i} className="child-row">
                                                <span className="emoji">👦</span>
                                                <input
                                                    type="text"
                                                    value={child}
                                                    onChange={(e) => {
                                                        setChildren(updateChild(i, e.target.value));
                                                    }}
                                                />
                                                <button className="remove" onClick={() => {
                                                    const updated = removeChild(i);
                                                    setChildren(updated);
                                                }}>X</button>
                                            </div>
                                        ))}
                                        {adults.map((adult, i) => (
                                            <div key={i} className="adult-row">
                                                <span className="emoji">👤</span>
                                                <input
                                                    type="text"
                                                    value={adult}
                                                    onChange={(e) => {
                                                        setAdults(updateAdult(i, e.target.value));
                                                    }}
                                                />
                                                <button className="remove" onClick={() => {
                                                    const updated = removeAdult(i);
                                                    setAdults(updated);
                                                }}>X</button>
                                            </div>
                                        ))}


                                    </div>

                                    <button className="add-child" onClick={() => {
                                        const updated = addChild("Child " + (children.length + 1));
                                        setChildren(updated);
                                    }}>+ Add child</button>
                                    <button className="add-adult" onClick={() => {
                                        const updated = addAdult("Adult " + (adults.length + 1));
                                        setAdults(updated);
                                    }}>+ Add adult</button>
                                </>

                                : ""}
                        </div>

                    </div>

                </div>

                <div className="background-elements">
                    <img className="coffee-image" src={CoffeeImage} alt="man drinking cofee on couch" />
                </div>

            </div>
        </>

    );
}

export default Profile;
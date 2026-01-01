import "./Navbar.css";
import LetterAvatar from "../LetterAvatar/LetterAvatar";
import Logo from "../../assets/icons/logo2.0.png";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useProfile } from "../../data/useProfile.js";

function Navbar({
    page=""
}){

    const [menuOpen, setMenuOpen] = useState(false);
    const profile = useProfile();
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        if(!profile) return;

        setFirstName(profile.first_name ?? "");
    }, [profile]);


    return (
        <>
            <nav className="navbar">

                <div className="left">
                    <button onClick={() => setMenuOpen(true)} className="button_menu">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="menu-button">
                            <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                        </svg>
                    </button>
                    <img src={Logo} alt="logo" className="logo"></img>
                    <span className="navbar-title">{page}</span>
                </div>

                <div className="right">
                    <LetterAvatar name={firstName || "Guest"} size={32} borderWidth={4} />
                </div>
            </nav>

            {/* Overlay */}
            {menuOpen && (
                <div className="overlay" onClick={() => setMenuOpen(false)} />
            )}

            {/* Side Panel */}
            <aside className={`side-panel ${menuOpen ? "open" : ""}`}>

                <div className="side-header">
                    <img className="logo" src={Logo} alt="logo"></img>

                    <button className="close-btn" onClick={() => setMenuOpen(false)}>
                        <svg 
                            aria-hidden="true" 
                            focusable="false" className="close_x" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible">
                            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                        </svg>
                    </button>
                </div>

                <nav className="side-nav">
                    <Link to="/"> 🏠 Home </Link>
                    <Link to="/create"> ➕ Create Hangout </Link>
                    <Link to="/join"> 🔗 Join Hangout </Link>
                    <Link to="/profile"> 👤 Profile </Link>
                </nav>
            </aside>

        </>
    );
}

export default Navbar;
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Home.css";
import CoffeeImage from "../../assets/images/better.png";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({hangouts = []}){

    const isEmpty = hangouts.length === 0;

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return <>
        <Navbar page="Home"/>

        <div className="home">
       

            <div className="content">
                <header className="home-header">
                    <h2>Hey there 👋</h2>
                    <p>Ready to plan a hangout? ☕</p>
                </header>

                <div className="quick-actions">
                    <Link to="/createhangout"><button className="primary">➕ Create hangout</button></Link>
                    <button className="secondary">🔗 Join hangout</button>
                </div>

                <section className="hangouts">
                    {isEmpty ? (
                    <div className="empty-card">
                        <div className="empty-icon">🗓️</div>
                        <h2>No hangouts yet</h2>
                        <p>
                        Start one and we’ll help split the cost —  
                        even with kids included.
                        </p>
                        <Link to="/createhangout">
                            <button className="primary">Create your first hangout</button>
                        </Link>
                    </div>
                    ) : (
                    hangouts.map(h => (
                        <HangoutCard key={h.id} hangout={h} />
                    ))
                    )}
                </section>

            </div>

            <div className="background-elements">
                <img className="coffee-image" src={CoffeeImage} alt="man drinking cofee on couch"/>
            </div>
        </div>

    </>
   

}
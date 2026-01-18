import './Hangout.css';
import CoffeeImage from "../../assets/images/better.png"
import Navbar from '../../components/Navbar/Navbar';
import { useEffect } from 'react';
import { useProfile } from '../../data/useProfile';



export default function Hangout(props) {

    const profile = useProfile();

    useEffect(() => {
        if (!profile) return;
    }, [profile])

    useEffect(() => {
        console.log(props.data.locations[0].arriveAt);
        console.log(props.data.locations[props.data.locations.length - 1].departAt)
    })

    return (
        <>
            <Navbar page="Hangout" />

            <div className="hangout_page">
                <div className='left_column'>
                    <div className='information_card'>
                        <h1>{props.data.name}</h1>
                        <div className='greeting_box'>
                            
                            <div className='textbox'>
                                <strong>{`Hi ${profile.first_name}!`}</strong>
                                <span>Are you ready for your hangout?</span>
                            </div>
                            
                            <h1>👋</h1>
                        </div>

                  
                        <p>{`${props.data.locations[0].arriveAt} to ${props.data.locations[props.data.locations.length - 1].departAt}`}</p>
                        

                    </div>

                    <div className='location_card'>
                        <h3>Locations</h3>
                        {props.data.locations.map((location, i) => {
                            return (
                                <div className='location' key={i}>

                                </div>
                            );
                        })}
                    </div>

                    <div className='bill_card'>
                        <h3>Bill</h3>
                        <p>Rates:</p>
                        <p>Total Bill</p>
                    </div>


                </div>

                <div className='middle_column'>
                    <h3>Attendees</h3>
                </div>

                <div className='right_column'>
                    <div className='optional_notes'>

                    </div>

                    <div className='contact_info'>

                    </div>
                </div>
            </div>
        </>
    )
}
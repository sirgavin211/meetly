import './Hangout.css';
import CoffeeImage from "../../assets/images/better.png"
import Navbar from '../../components/Navbar/Navbar';
import { useEffect } from 'react';



export default function Hangout(props) {

    useEffect(() => {
        console.log(props.data.locations[0].arriveAt);
        console.log(props.data.locations[props.data.locations.length - 1].departAt)
    })

    return (
        <>
            <Navbar page="Hangout"/>

            <div className="hangout_page">
                <div className='left_column'>
                    <div className='information_card'>
                        <h3>{props.data.name}</h3>
                        <p>{`${props.data.locations[0].arriveAt} to ${props.data.locations[props.data.locations.length-1].departAt}`}</p>
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

                    </div>
                </div>

                <div className='middle_column'>

                </div>

                <div className='right_column'>

                </div>
                
            </div>
            
        </>
    )
}
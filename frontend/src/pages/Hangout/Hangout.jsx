import './Hangout.css';
import CoffeeImage from "../../assets/images/better.png"
import Navbar from '../../components/Navbar/Navbar';
import { data } from 'react-router-dom';


export default function Hangout(props) {


    return (
        <>
            <Navbar page="Hangout"/>

            <div className="hangout_page">
                <div className='left_column'>
                    <div className='information_card'>
                        <h3>{props.data.name}</h3>
                        <p>{data.locations[0].arriveAt + " " + data.locations[data.locations.length -1]}</p>
                    </div>

                    <div className='location_card'>
                        <h3>Locations</h3>
                        {data.locations.map((location, i) => {
                            return (
                                <>
                                    
                                </>
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
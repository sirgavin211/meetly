import './Hangout.css';
import CoffeeImage from "../../assets/images/better.png"
import Navbar from '../../components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useProfile } from '../../data/useProfile';



export default function Hangout(props) {

  const profile = useProfile();

  const adultRate = useState(-1);
  const childRate = useState(-1);

  const usePercentage = useState(true);


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

            <div className='timebox'>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3A3A3A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>

              <span>{`${props.data.locations[0].arriveAt} to ${props.data.locations[props.data.locations.length - 1].departAt}`}</span>
            </div>



          </div>

          <div className='location_card'>
            {props.data.locations.length > 1 ?
              <h3>Locations</h3> :
              <h3>Location</h3>
            }
            <div className="location_list">
              {props.data.locations.map((location, i) => {
                return (
                  <div className='location' key={i}>
                    <input type="text" readOnly value={`📍 ${props.data.locations[i].address}`} />
                    <p>{`${props.data.locations[i].arriveAt} to ${props.data.locations[i].departAt}`}</p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* 
                    ┌─────────────────────────────────────────┐
                    │ Bill                                    │
                    │                                         │
                    │ Adult $25 • Child $12.50 • Toddler Free │
                    │                                         │
                    │ Total: $87.50                           │
                    │ (2 Adults, 3 Children, 1 Toddler)       │
                    └─────────────────────────────────────────┘ */}

          <div className='bill_card'>
            <h3>Bill</h3>
            {usePercentage ?
              <p>💰 Adult {adultRate}% • Child {childRate}%</p> :
              <p>💰 Adult ${adultRate} • Child ${childRate}</p>
            }
            <p>🎟️ Total Bill: </p>
          </div>


        </div>

        <div className='middle_column'>

          <div className='join_card'>

          </div>

          <div className='attendees'>

          </div>


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

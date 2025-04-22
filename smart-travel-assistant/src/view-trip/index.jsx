import { useLocation, useParams } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import {doc, getDoc} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import FoodOptions from './components/FoodOptions';
import DailyPlan from './components/DailyPlan';


const ViewTrip = () => {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([]);
  useEffect(()=>{
    tripId && GetTripData();
  },[tripId])

  //use to get trip info
  const GetTripData=async()=>{
    const docRef = doc(db,'TripDetails',tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:",docSnap.data());
      setTrip(docSnap.data());
      console.log(trip);
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/*Info Section*/}
      <InfoSection trip={trip} />
      {/*Recommended hotel option */}
      <Hotels trip={trip}/>
      {/*Restaurants */}
      <FoodOptions trip={trip} />
      {/*Daily plan */}
      <DailyPlan trip={trip}/>
      {/*Footer */}
    </div>
  )
}

export default ViewTrip

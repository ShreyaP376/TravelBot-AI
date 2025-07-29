import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight ,faCalendarAlt ,faDollarSign ,faUsers ,faTrain ,faTag ,faUser ,faMapMarkerAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Button } from '../components/ui/button';

function MyTrips() {
    const navigate = useNavigate();
    const [trips,setUserTrips]= useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }
        const q = query(collection(db, 'TripDetails'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, { id: doc.id, ...doc.data() }]);
        });
    };

  return (
    <div className="max-w-7xl mx-auto mt-6">
    <h2 className="text-3xl font-bold mb-6 text-center">Your Trips</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="bg-white shadow-lg rounded-xl overflow-hidden w-full hover:scale-105 transition-all cursor-pointer gap-4 h-full"
        >
          <div className="relative">
            {/* Optional Image for the Trip */}
            {/* <img
              src={`https://source.unsplash.com/400x300/?${trip?.tripData?.destination || 'travel'}`}
              alt="Trip Destination"
              className="w-full h-48 object-cover"
            /> */}
          </div>
          <div className="p-6">
            <p className="text-lg font-semibold text-gray-800">
              {trip?.tripData?.tripPlan?.origin} {" "}
              <FontAwesomeIcon icon={faArrowRight} className="text-violet-500 mr-2" /> 
              {trip?.tripData?.tripPlan?.destination}
            </p>
  
            <div className="flex justify-center mt-4">
  <div className="flex flex-col space-y-2">
    {/* User Choices Section */}
    <div className="flex items-center">
      <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-600">Date: {trip?.userChoices?.startDate}</span>
    </div>
    <div className="flex items-center">
      <FontAwesomeIcon icon={faTrain} className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-600">Travel Mode: {trip?.userChoices?.mode}</span>
    </div>
    <div className="flex items-center">
      <FontAwesomeIcon icon={faTag} className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-600">Trip Type: {trip?.userChoices?.type}</span>
    </div>
    <div className="flex items-center">
      <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
      <span className="text-sm text-gray-600">Traveler: {trip?.userChoices?.traveler}</span>
    </div>
  </div>
</div>

  
            {/* View Trip Button */}
            <Button
              className="btn-transparent bg-white rounded-lg border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 mt-4"
              onClick={() => navigate('/view-trip/' + trip.id)}
            >
              View trip
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  )
}

export default MyTrips
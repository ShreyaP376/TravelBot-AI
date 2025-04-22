import React, {useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import fetchPhoto from "../../service/GlobalAPI";
//import placeImage from '../place.png';

const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(PHOTO_REF_URL);
  
  useEffect(() => {
    const fetchPlacePhoto = async () => {
      if (!trip || !trip.tripData || !trip.tripData.tripPlan.destination) return;
  
      const destination = trip.tripData.tripPlan.destination;
      const query = `Random scenic views of ${destination} image`;
      // ✅ Declare the query inside the function
  
      try {
        console.log('Unsplash Query:', query); // ✅ Now this will work
        const photo = await fetchPhoto(query);
        setPhotoUrl(photo);
      } catch (error) {
        console.error('Error fetching place photo:', error.message);
        setPhotoUrl(PHOTO_REF_URL);
      }
    };
    fetchPlacePhoto(); // ✅ Don’t forget to call the async function
  }, [trip]);
  

    
  return (
    <div>
      <div className="relative w-full">
              <img 
                src={photoUrl?photoUrl:"/place.png"}
                alt="Trip Placeholder" 
                className="h-[470px] w-full object-cover rounded-xl mb-4"
              />
        </div>
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.tripData?.tripPlan?.origin} {" "}<FontAwesomeIcon
                                            icon={ faArrowRight }                              
                                            className="text-violet-600 mr-2"
                                          />
          {trip?.tripData?.tripPlan?.destination}
        </h2>
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm">
            {/* <FontAwesomeIcon icon="fa-solid fa-calendar-days" /> */}
            Duration: {trip?.userChoices?.noOfDays} Days
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm">
            Budget: {trip?.userChoices?.budget}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm">
            {trip?.userChoices?.type} trip
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;

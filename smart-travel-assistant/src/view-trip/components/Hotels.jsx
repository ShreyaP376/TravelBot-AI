import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyCheckDollar,
  faIndianRupeeSign,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import fetchPhoto from "../../service/GlobalAPI";

const PHOTO_REF_URL =
  "https://via.placeholder.com/1000?text=Photo+Not+Available";
function Hotels({ trip }) {
  const [hotelPhotos, setHotelPhotos] = useState({});

  useEffect(() => {
    const fetchAllHotelPhotos = async () => {
      if (!trip?.tripData?.tripPlan?.stayOptions) return;

      const photosMap = {};
      for (const stay of trip.tripData.tripPlan.stayOptions) {
        const hotelName = stay.hotelName;
        const hotelAddress = stay.hotelAddress;
        const randomSeed = Math.floor(Math.random() * 1000);
        const query = `random hotel images from ${trip?.tripData?.tripPlan?.destination}`;

        try {
          const photo = await fetchPhoto(query); // your existing fetch function
          photosMap[hotelName] = photo;
        } catch (error) {
          console.error(
            `Error fetching photo for ${hotelName}:`,
            error.message
          );
          photosMap[hotelName] = PHOTO_REF_URL;
        }
      }

      setHotelPhotos(photosMap);
    };

    fetchAllHotelPhotos();
  }, [trip]);

  return (
    <div>
    <h2 className="font-bold text-xl mt-8">Stay Recommendations</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {trip?.tripData?.tripPlan?.stayOptions?.map((item, index) => (
        <div
          key={index}
          className="hover:scale-105 transition-all cursor-pointer rounded-xl shadow-lg p-4"
        >
          {/* <img
            src={item.imageurl || "/place.png"}
            alt={item.hotelName}
            className="rounded-xl w-full h-48 object-cover"
          /> */}
          <h3 className="mt-2 text-xl font-bold text-gray-800">
            {item?.hotelName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-gray-600 mr-2"
            />
            {item?.hotelAddress}
          </p>
          <p className="text-sm text-gray-700 mt-1 flex items-center">
            <FontAwesomeIcon icon={faTag} className="text-gray-600 mr-2" />
            {item?.costRange}
          </p>
          <a
            href={`https://www.google.com/maps?q=${item?.latitute},${item?.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-violet-500 underline mt-2 inline-block"
          >
            View on Maps
          </a>
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default Hotels;

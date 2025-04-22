import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faStar, faTag } from "@fortawesome/free-solid-svg-icons";


function DailyPlan({ trip }) {
  return (
    <div>
  <h2 className="font-bold text-xl mt-8">Your Day-wise Itinerary</h2>

  <div className="space-y-8 mt-4">
    {trip?.tripData?.tripPlan?.dailyItinerary?.map((dayPlan, dayIndex) => (
      <div key={dayIndex}>
        {/* Day Header */}
        <h3 className="text-lg font-bold mb-3">
          Day {dayPlan.day}: {dayPlan.theme}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
          {dayPlan?.placesToVisit?.map((place, index) => (
            <div key={index}>
              {/* Time Row */}
              <div className="text-sm text-gray-500 font-semibold mb-2">
                Time: {place?.timing}
              </div>

              {/* Place Card */}
              <div className="flex flex-col sm:flex-row border p-4 rounded-lg shadow-sm hover:scale-105 transition-all cursor-pointer gap-4 h-full">
                {/* <img
                  src={place?.placeImageUrl || "/planner.jpg"}
                  alt={place?.placename}
                  className="rounded-xl w-full sm:w-40 sm:h-40 object-cover"
                /> */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h4 className="text-base font-semibold">{place?.placename}</h4>
                    <p className="text-sm text-gray-600 mt-1">{place?.details}</p>
                    {place?.rating && (
                      <p className="text-sm text-gray-700 mt-1 flex items-center">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-gray-600 mr-2"
                        />
                        {place?.rating} stars
                      </p>
                    )}
                    {place?.pricing && (
                      <p className="text-sm text-gray-700 mt-1 flex items-center">
                        <FontAwesomeIcon
                          icon={faTag}
                          className="text-gray-600 mr-2"
                        />
                        {place?.pricing}
                      </p>
                    )}
                    <a
                      href={`https://www.google.com/maps?q=${place?.latitute},${place?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-violet-500 underline mt-2 inline-block"
                    >
                      View on Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

  
  );
}

export default DailyPlan;

import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faMoneyCheckDollar, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

function FoodOptions({ trip}) {
  return (
    <div>
  <h2 className="font-bold text-xl mt-8">Restaurant Recommendations</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {trip?.tripData?.tripPlan?.restaurantOptions?.map((restaurant, index) => (
      <div
        key={index}
        className="hover:scale-105 transition-all cursor-pointer rounded-xl shadow-lg p-4"
      >
        {/* <img
          src={restaurant?.imageUrl || "/planner.jpg"}
          alt={restaurant?.restname}
          className="rounded-xl w-full h-48 object-cover"
        /> */}
        <h3 className="mt-2 font-semibold text-lg">
          {restaurant?.restname}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-gray-500 mr-2"
          />
          {restaurant?.restaddress}
        </p>
        <p className="mt-3 text-sm font-medium text-gray-800">Famous Dishes:</p>
        <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
          {restaurant?.famousfood?.split(',').map((food, idx) => (
            <li key={idx}>{food}</li>
          ))}
        </ul>
        <a
          href={`https://www.google.com/maps?q=${restaurant?.latitute},${restaurant?.longitude}`}
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

  )
}

export default FoodOptions
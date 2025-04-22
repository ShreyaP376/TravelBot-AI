import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
<div className="w-screen h-screen flex">
  {/* Image */}
  <div className="w-1/2 h-full">
    <img
      src="/background.png"
      alt="Banner"
      className="w-full h-full object-left object-cover"
    />
  </div>

  {/* Text Section */}
  <div className="w-1/2 flex flex-col justify-center items-start px-10">
    <h1 className="font-extrabold text-[40px] leading-tight mb-4">
      <span className="text-violet-500">Discover Your Next Adventure with AI:</span> Let AI Curate an Unforgettable Journey, Uniquely Yours
    </h1>

    <p className="text-lg text-gray-500 mb-6">
    From breathtaking landscapes to hidden local gems, our intelligent planner creates fully personalized itineraries that match your pace, preferences, and purpose — giving you the freedom to explore, without the hassle of planning.
    </p>

    <Link to="/create-trip">
      <Button className="bg-violet-500 text-white px-6 py-3 rounded-xl hover:bg-violet-600 transition">
        Get Started, It's Free
      </Button>
    </Link>
  </div>
</div>


  )
}

export default Hero
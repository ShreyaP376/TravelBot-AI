export const selectTravelList=[
    {
        id: 1,
        title: 'Just Me',
        desc:'A sole traveles in exploration',
        icons:'✈️',
        people:'1 People'
    },
    {
        id: 2,
        title: 'A Couple',
        desc:'Two traveles in tandem',
        icons:'👫',
        people:'2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc:'A group of fun loving adv',
        icons:'👨‍👩‍👧‍👦',
        people:'3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc:'A bunch of thrill-seekers',
        icons:'👫👬👭👩‍👩‍👦',
        people:'5 to 10 People'
    },


]
export const SelectBudgetOptions=[
    {
        id: 1,
        title: 'Cheap',
        desc:'Stay conscious of costs',
        icons:'💸',
    },
    {
        id: 2,
        title: 'Moderate',
        desc:'Keep cost on the average side',
        icons:'💵',
    },
    {
        id: 1,
        title: 'Luxury',
        desc:'Dont worry about cost',
        icons:'💎',
    },

]
export const SelectType=[
    {
        title: "Adventure",
        desc: "Trekking, hiking, jungle safaris, rafting, and mountain thrills." 
      },
      {
        title: "Relaxation",
        desc: "Beaches, cruises, spas, resorts, and peaceful escapes."
      },
      {
        title: "Cultural & Spiritual",
        desc: "Temples, heritage sites, local culture, and rituals."
      },
      {
        title: "Nature & Wildlife",
        desc: "Parks, hill stations, waterfalls, and wildlife spots."
      },
      {
        title: "City Explorer",
        desc: "Museums, shopping, nightlife, and iconic city sights."
      }
]

export const AI_PROMPT = `
Generate a {type} trip plan as name tripPlan starting from {departLocation} as origin to {location} as destination, for {totalDays} days, for {traveler}, with a {budget} budget. The mode of travel is {mode} . Add famous image of destination which can be accessed directly in to img tag as {imageURL}

1. Suggest 3-4 stay options under the key 'stayOptions'. Each stay option must include:
   - "hotelName": Name of the hotel
   - "hotelAddress": Hotel address
   - "costRange": Cost in INR
   - "latitute": Latitude of the hotel
   - "longitude": Longitude of the hotel
   - "imageurl": give me publicly accessible image URL for that popular luxury hotel. Make sure the URL point directly to .jpg or .png

2. Suggest 3-4 popular restaurant options under the key 'restaurantOptions'. Each restaurant must include:
   - "restname": Name of the restaurant
   - "restaddress": Restaurant address
   - "famousfood": Famous dishes
   - "latitute": Latitude of the restaurant
   - "longitude": Longitude of the restaurant
   - "imageurl": A valid image URL of the restaurant

3. Suggest an itinerary under the key 'dailyItinerary' for {Days} days under a JSON object. For each day:
   - Add day number as day
   - Add a "theme" as a short sentence describing what the day is about (e.g., "Arriving at destination", "Exploring beaches and forts", etc.)
   - Provide a list of places to visit aligned with the day's theme.

Each place must include:
   - "placename": Name of the place
   - "details": Brief description
   - "imageurl": Valid image URL
   - "latitude": Latitude coordinate
   - "longitude": Longitude coordinate
   - "pricing": Ticket price or "Free"
   - "rating": Rating out of 5
   - "timing": Suggested time to visit (e.g., "10:00 AM - 12:00 PM") 
   under the key 'placesToVisit'

The output should be in **valid JSON format** only and strictly use the provided keys.
IMPORTANT: All image URLs must be direct links to .jpg or .png images and must NOT be Google search result links.
`;

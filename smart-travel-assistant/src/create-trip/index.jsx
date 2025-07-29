import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  selectTravelList,
  SelectType,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { chatSession } from "../service/AiModel";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

function CreateTrip() {
  const [location, setLocation] = useState();
  const [place, setPlace] = useState();
  const [mode, setMode] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const navigate = useNavigate();

  //function to update form data
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  // function to generate trip plan
  const OnGenerateTrip = async (any) => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      alert("Please enter all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{type}", formData?.type)
      .replace("{departLocation}", formData?.departLocation)
      .replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{startDate}", formData?.startDate)
      .replace("{endDate}", formData?.endDate)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{mode}", formData?.mode)
      .replace("{Days}", formData?.noOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    SaveTrip(result?.response?.text());
  };

  const SaveTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "TripDetails", docId), {
      userChoices: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    console.log("Hii");

    if (!tokenInfo || !tokenInfo.access_token) {
      console.warn("Missing or invalid token info:", tokenInfo);
      return;
    }

    console.log(
      "Attempting to fetch profile with token:",
      tokenInfo.access_token
    );

    fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetch response:", data);
        localStorage.setItem("user", JSON.stringify(data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  const handleDateChange = (field, value) => {
    if (field === "start") {
      setStartDate(value);
      handleInputChange("startDate", value);
    } 
    if (field === "end") {
      console.log("eee",value)
      setEndDate(value);
      handleInputChange("endDate", value);
    }
    const start = field === "start" ? new Date(value) : new Date(startDate);
    const end = field === "end" ? new Date(value) : new Date(endDate);

    if (start && end && !isNaN(start) && !isNaN(end)) {
      const diffTime = end.getTime() - start.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const totalDays = days > 0 ? days : 0;

    setNoOfDays(totalDays);
    handleInputChange("noOfDays", totalDays);
    }
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your location?</h2>
          <input
            type="text"
            placeholder="Enter current location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={location}
            onChange={(l) => {
              const value = l.target.value;
              setLocation(value);
              handleInputChange("departLocation", value);
              console.log(value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <input
            type="text"
            placeholder="Enter destination"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={place}
            onChange={(e) => {
              const value = e.target.value;
              setPlace(value);
              handleInputChange("location", value);
              console.log(value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="block mb-1 text-gray-600">Start Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Start date"
                onChange={(e) => handleDateChange("start", e.target.value)}
                value={startDate}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="block mb-1 text-gray-600">End Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="End date"
                onChange={(e) =>handleDateChange("end", e.target.value)
                }
                value={endDate}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            What's your preferred mode of Travelling?
          </h2>
          <input
            type="text"
            placeholder="Ex. train"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={mode}
            onChange={(e) => {
              const value = e.target.value;
              setMode(value);
              handleInputChange("mode", value); // use the latest value here
              console.log(value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.budget == item.title &&
                    "shadow-lg border-2 border-violet-500"
                  }
                `}
              >
                {/* <h2 className="text-4xl">{item.icons}</h2> */}
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who are you travelling with on your next trip?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.traveler == item.title &&
                    "shadow-lg border-2 border-violet-500"
                  }
                `}
              >
                {/* <h2 className="text-4xl">{item.icons}</h2> */}
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            What type of travel experience are you looking for?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectType.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("type", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.type == item.title &&
                    "shadow-lg border-2 border-violet-500"
                  }
                `}
              >
                {/* <h2 className="text-4xl">{item.icons}</h2>  */}
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button
          disabled={loading}
          className="bg-black text-white rounded px-4 py-2 mt-10 transition-all duration-200 hover:bg-violet-500"
          onClick={OnGenerateTrip}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7"> Sign in with Google</h2>
              <p>Sign in to the App with Google authentication security</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign in
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

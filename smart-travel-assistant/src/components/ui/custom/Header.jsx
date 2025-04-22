import React, { useEffect, useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import MyTrips from "../../../my-trips";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" />
      <div>
        {user ? (
          <div className="flex items-center gap-1">
            <a
              href="/create-trip"
              className="text-violet-500 hover:underline font-semibold"
            >
              Create Trip
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="/myTrips"
              className="text-violet-500 hover:underline font-semibold"
            >
              My Trips
            </a>

            {user ? (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">|</span>

                <h2
                  className="text-violet-500 hover:underline font-semibold cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </div>
            ) : (
              <h2
                className="text-violet-500 hover:underline font-semibold cursor-pointer"
                onClick={() => setOpenDialog(true)}
              >
                Sign Up
              </h2>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <a
              href="/create-trip"
              className="text-violet-500 hover:underline font-semibold"
            >
              Create Trip
            </a>
            <span className="text-gray-400">|</span>
            <h2
              className="text-violet-500 hover:underline font-semibold cursor-pointer"
              onClick={() => setOpenDialog(true)}
            >
              Sign Up
            </h2>
          </div>
        )}
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

export default Header;

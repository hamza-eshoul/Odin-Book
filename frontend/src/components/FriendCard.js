import React, { useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { MoonLoader } from "react-spinners";

const FriendCard = ({ firstName, lastName, friend_id, friendStatus }) => {
  const { user, dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(null);

  const addFriendRequest = async () => {
    setIsLoading(true);
    const user_id = user._id;

    const response = await fetch("http://localhost:4000/user/add_friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, friend_id }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setIsRequestSent(true);
      dispatch({ type: "UPDATE_USER", payload: json });
    }
  };

  const cancelFriendRequest = async () => {};

  return (
    <div className="flex flex-col w-[218px] shadow-lg rounded-xl border-[0.5px] border-zinc-200 bg-white">
      {/* image */}
      <img
        src={defaultProfile}
        alt="Profile Image"
        className="w-full rounded-t-lg"
      />

      {/* Name */}
      <h2 className="font-semibold text-lg px-2 pt-2 text-center">
        {" "}
        {firstName} {lastName}
      </h2>

      {/* Add Friend Button */}
      {friendStatus === "Friend" ? (
        <Link
          className="text-blue-600 bg-blue-100/50 hover:bg-blue-100 py-2 mx-3 rounded-lg my-4 text-center"
          to={`/profile/${friend_id}`}
        >
          View Profile
        </Link>
      ) : friendStatus === "Friend_Request" ? (
        <button
          className="text-blue-600 bg-blue-100/50 hover:bg-blue-100 py-2 mx-3 rounded-lg my-4"
          onClick={() => {
            cancelFriendRequest();
          }}
        >
          {" "}
          Cancel
        </button>
      ) : friendStatus === "Non_Friend" ? (
        <button
          className={`${
            isRequestSent
              ? "bg-zinc-200 text-zinc-400 pointer-events-none"
              : "text-blue-600 bg-blue-100/50 hover:bg-blue-100"
          }  py-2 mx-3 rounded-lg my-4`}
          onClick={() => {
            addFriendRequest();
          }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <MoonLoader
                color={"#3c82f6"}
                loading={isLoading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : isRequestSent ? (
            "Request sent!"
          ) : (
            "Add Friend"
          )}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default FriendCard;

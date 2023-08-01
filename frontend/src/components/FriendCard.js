import React, { useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { MoonLoader } from "react-spinners";

const FriendCard = ({
  firstName,
  lastName,
  friend_id,
  friendStatus,
  userImage,
  cardStatus,
}) => {
  const { user, dispatch } = useAuthContext();

  // Sent Requests state
  const [isLoading, setIsLoading] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(null);

  // Cancel Requests state
  const [isCancelRequestLoading, setIsCancelRequestLoading] = useState("");
  const [isRequestCanceled, setIsRequestCanceled] = useState(null);

  // Accept & Reject Friend Request state
  const [isProcessRequestLoading, setIsProcessRequestLoading] = useState(null);
  const [isRequestProcessed, setIsRequestProcessed] = useState(null);

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

  const cancelFriendRequest = async () => {
    setIsCancelRequestLoading(true);

    const user_id = user._id;

    const userSentRequests = user.sent_friends_requests;

    const response = await fetch(
      "http://localhost:4000/user/cancel_friend_request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, friend_id, userSentRequests }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      setIsCancelRequestLoading(false);
      setIsRequestCanceled(true);
      dispatch({ type: "UPDATE_USER", payload: json });
    }
  };

  const acceptFriendRequest = async () => {
    setIsProcessRequestLoading(true);

    const user_id = user._id;
    const userIncomingRequests = user.incoming_friends_requests;

    const response = await fetch("http://localhost:4000/user/accept_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, friend_id, userIncomingRequests }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsProcessRequestLoading(false);
      setIsRequestProcessed(true);
      dispatch({ type: "UPDATE_USER", payload: json });
    }
  };

  const rejectFriendRequest = async () => {
    setIsProcessRequestLoading(true);

    const user_id = user._id;
    const userIncomingRequests = user.incoming_friends_requests;

    const response = await fetch("http://localhost:4000/user/reject_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, friend_id, userIncomingRequests }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsProcessRequestLoading(false);
      setIsRequestProcessed(true);
      dispatch({ type: "UPDATE_USER", payload: json });
    }
  };

  return (
    <div className="flex flex-col items-center w-[218px] shadow-lg rounded-xl border-[0.5px] border-zinc-200 bg-white">
      {/* image */}
      {cardStatus === "loading" ? (
        <div className="bg-slate-200 animate-pulse rounded-full w-36 h-36 mt-6 mb-8" />
      ) : (
        <img
          src={userImage ? userImage : defaultProfile}
          alt="Profile"
          className="w-full h-[240px] object-fit rounded-t-lg"
        />
      )}

      {/* Name */}

      {cardStatus === "loading" ? (
        <div className="w-4/5 animate-pulse h-3.5 rounded bg-zinc-200 my-5" />
      ) : (
        <Link
          to={`/profile/${friend_id}/`}
          className="font-semibold text-lg px-2 pt-2 text-center hover:underline"
        >
          {" "}
          {firstName} {lastName}
        </Link>
      )}

      {/* Add Friend Button */}

      {cardStatus === "loading" ? (
        <div className="w-4/5 animate-pulse h-3.5 rounded bg-zinc-200 mb-10" />
      ) : (
        <>
          {friendStatus === "Friend" ? (
            <Link
              className="text-blue-600 bg-blue-100/50 hover:bg-blue-100  rounded-lg w-[80%] py-2 px-2.5 m-3 text-center"
              to={`/profile/${friend_id}/`}
            >
              View Profile
            </Link>
          ) : friendStatus === "Sent_Request" ? (
            <button
              className={`${
                isRequestCanceled
                  ? "bg-zinc-200 text-zinc-400 pointer-events-none"
                  : "text-blue-600 bg-blue-100/50 hover:bg-blue-100"
              } rounded-lg w-[80%] py-2 px-2.5 m-3`}
              onClick={() => {
                cancelFriendRequest();
              }}
            >
              {isCancelRequestLoading ? (
                <div className="flex justify-center items-center">
                  <MoonLoader
                    color={"#3c82f6"}
                    loading={isCancelRequestLoading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : isRequestCanceled ? (
                "Request Canceled!"
              ) : (
                "Cancel"
              )}
            </button>
          ) : friendStatus === "Incoming_Request" ? (
            <div className="flex gap-4 justify-center">
              {isProcessRequestLoading ? (
                <MoonLoader
                  color={"#3c82f6"}
                  loading={isProcessRequestLoading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="m-4"
                />
              ) : (
                <>
                  {isRequestProcessed ? (
                    <button className="bg-zinc-200 text-zinc-400 pointer-events-none rounded-lg py-2 px-2.5 m-3">
                      Request Procecced!
                    </button>
                  ) : (
                    <>
                      {" "}
                      <button
                        className="text-blue-600 bg-blue-100/50 hover:bg-blue-100 rounded-lg  py-2.5 px-3 m-3"
                        onClick={() => {
                          acceptFriendRequest();
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="text-red-500 bg-zinc-100 hover:bg-zinc-200 rounded-lg  py-2.5 px-3 m-3"
                        onClick={() => {
                          rejectFriendRequest();
                        }}
                      >
                        Reject
                      </button>{" "}
                    </>
                  )}
                </>
              )}
            </div>
          ) : friendStatus === "Non_Friend" ? (
            <button
              className={`${
                isRequestSent
                  ? "bg-zinc-200 text-zinc-400 pointer-events-none"
                  : "text-blue-600 bg-blue-100/50 hover:bg-blue-100"
              }  rounded-lg w-[80%] py-2 px-2.5 m-3`}
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
        </>
      )}
    </div>
  );
};

export default FriendCard;

import React, { useState } from "react";
import defaultProfile from "../../assets/images/defaultProfile.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
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
      },
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
    <div className="flex w-[230px] flex-col items-center rounded-xl border-[1px] border-zinc-200 bg-white shadow-lg">
      {/* image */}
      {cardStatus === "loading" ? (
        <div className="mb-8 mt-6 h-36 w-36 animate-pulse rounded-full bg-slate-200" />
      ) : (
        <img
          src={userImage ? userImage : defaultProfile}
          alt="Profile"
          className="object-fit h-[240px] w-full rounded-t-lg"
        />
      )}

      {/* Name */}

      {cardStatus === "loading" ? (
        <div className="my-5 h-3.5 w-4/5 animate-pulse rounded bg-zinc-200" />
      ) : (
        <Link
          to={`/profile/${friend_id}/`}
          className="px-2 pt-2 text-center text-lg font-semibold hover:underline"
        >
          {" "}
          {firstName} {lastName}
        </Link>
      )}

      {/* Add Friend Button */}

      {cardStatus === "loading" ? (
        <div className="mb-10 h-3.5 w-4/5 animate-pulse rounded bg-zinc-200" />
      ) : (
        <>
          {friendStatus === "Friend" ? (
            <Link
              className="m-3 w-[80%] rounded-lg  bg-blue-100/50 px-2.5 py-2 text-center text-blue-600 hover:bg-blue-100"
              to={`/profile/${friend_id}/`}
            >
              View Profile
            </Link>
          ) : friendStatus === "Sent_Request" ? (
            <button
              className={`${
                isRequestCanceled
                  ? "pointer-events-none bg-zinc-200 text-zinc-400"
                  : "bg-blue-100/50 text-blue-600 hover:bg-blue-100"
              } m-3 w-[80%] rounded-lg px-2.5 py-2`}
              onClick={() => {
                cancelFriendRequest();
              }}
            >
              {isCancelRequestLoading ? (
                <div className="flex items-center justify-center">
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
            <div className="flex justify-center gap-4">
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
                    <button className="pointer-events-none m-3 rounded-lg bg-zinc-200 px-2.5 py-2 text-zinc-400">
                      Request Procecced!
                    </button>
                  ) : (
                    <>
                      {" "}
                      <button
                        className="m-3 rounded-lg bg-blue-100/50 px-3  py-2.5 text-blue-600 hover:bg-blue-100"
                        onClick={() => {
                          acceptFriendRequest();
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="m-3 rounded-lg bg-zinc-100 px-3  py-2.5 text-red-500 hover:bg-zinc-200"
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
                  ? "pointer-events-none bg-zinc-200 text-zinc-400"
                  : "bg-blue-100/50 text-blue-600 hover:bg-blue-100"
              }  m-3 w-[80%] rounded-lg px-2.5 py-2`}
              onClick={() => {
                addFriendRequest();
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
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

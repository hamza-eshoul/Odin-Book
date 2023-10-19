import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import FriendCard from "./FriendCard";

const FriendsRequests = () => {
  const [sentFriendsRequests, setSentFriendsRequests] = useState([]);
  const [incomingFriendsRequests, setIncomingFriendsRequests] = useState([]);
  const [cardStatus, setCardStatus] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    const sent_friends_requests = user.sent_friends_requests;
    const incoming_friends_requests = user.incoming_friends_requests;

    const fetchUserFriendRequests = async () => {
      setSentFriendsRequests([" ", " ", " "]);
      setIncomingFriendsRequests([" ", " ", " "]);
      setCardStatus("loading");
      const response = await fetch(
        "http://localhost:4000/user/friends_requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sent_friends_requests,
            incoming_friends_requests,
          }),
        },
      );

      const json = await response.json();

      if (response.ok) {
        setSentFriendsRequests(json.sentFriendsRequests);
        setIncomingFriendsRequests(json.incomingFriendsRequests);
        setCardStatus("");
      }
    };

    fetchUserFriendRequests();
  }, []);

  return (
    <div className="w-4/5 bg-[#fbfcfe]  px-14 py-10">
      {/* Incoming Requests */}
      <div className="border-b-[1px] border-zinc-400/30 pb-10">
        <h1 className="pb-4 text-2xl font-semibold">Incoming Requests</h1>

        <div className="flex flex-wrap gap-5">
          {cardStatus == "loading" ? (
            <>
              {" "}
              {incomingFriendsRequests.map((request) => (
                <FriendCard key={request._id} cardStatus="loading" />
              ))}{" "}
            </>
          ) : (
            <>
              {incomingFriendsRequests.length !== 0 ? (
                <>
                  {" "}
                  {incomingFriendsRequests.map((request) => (
                    <FriendCard
                      key={request._id}
                      firstName={request.firstName}
                      lastName={request.lastName}
                      friend_id={request._id}
                      userImage={request.profileImg.url}
                      friendStatus="Incoming_Request"
                    />
                  ))}{" "}
                </>
              ) : (
                <h3 className="text-xl"> No requests yet</h3>
              )}{" "}
            </>
          )}
        </div>
      </div>

      {/* Sent Requests */}
      <div className="pt-10">
        <h1 className="pb-4 text-2xl font-semibold">Sent Requests</h1>

        <div className="flex flex-wrap gap-5">
          {cardStatus == "loading" ? (
            <>
              {" "}
              {sentFriendsRequests.map((request) => (
                <FriendCard key={request._id} cardStatus="loading" />
              ))}{" "}
            </>
          ) : (
            <>
              {sentFriendsRequests.length !== 0 ? (
                <>
                  {" "}
                  {sentFriendsRequests.map((request) => (
                    <FriendCard
                      key={request._id}
                      firstName={request.firstName}
                      lastName={request.lastName}
                      friend_id={request._id}
                      userImage={request.profileImg.url}
                      friendStatus="Sent_Request"
                    />
                  ))}{" "}
                </>
              ) : (
                <h3 className="text-xl"> No requests yet</h3>
              )}{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsRequests;

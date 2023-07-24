import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import FriendCard from "./FriendCard";

const FriendsRequests = () => {
  const [friendsRequests, setFriendsRequests] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const friends_requests_ids = user.friends_requests_ids;

    const fetchUserFriendRequests = async () => {
      const response = await fetch(
        "http://localhost:4000/user/friends_requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ friends_requests_ids }),
        }
      );

      const json = await response.json();

      setFriendsRequests(json);
    };

    fetchUserFriendRequests();
  }, []);

  return (
    <div className="px-14 py-10 w-4/5">
      {/* Incoming Requests */}
      <div className="border-b-[1px] border-zinc-400/30 pb-10">
        <h1 className="text-2xl font-semibold pb-4">Incoming Requests</h1>
        <h3> No requests yet</h3>
      </div>

      {/* Sent Requests */}
      <div className="pt-10">
        <h1 className="text-2xl font-semibold pb-4">Sent Requests</h1>

        <div className="flex gap-5 flex-wrap ml-20">
          {friendsRequests.length !== 0 ? (
            friendsRequests.map((friendRequest) => (
              <FriendCard
                key={friendRequest._id}
                firstName={friendRequest.firstName}
                lastName={friendRequest.lastName}
                friend_id={friendRequest._id}
                friendStatus="Friend_Request"
              />
            ))
          ) : (
            <h3> No requests yet</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsRequests;

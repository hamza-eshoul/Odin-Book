import React, { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import { useAuthContext } from "../hooks/useAuthContext";

const FriendsHome = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const userFriends_ids = user.friends_ids;
    const userSentRequests = user.sent_friends_requests;
    const userIncomingRequests = user.incoming_friends_requests;
    const user_id = user._id;

    const user_and_friends_ids = userFriends_ids.concat(
      userSentRequests,
      userIncomingRequests,
      user_id
    );

    const fetchUsers = async () => {
      const response = await fetch(
        "http://localhost:4000/user/non_friends_users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_and_friends_ids }),
        }
      );

      const json = await response.json();

      setUsers(json);
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-14 py-10 w-4/5 ">
      {/* Header */}
      <h1 className="text-3xl font-semibold pb-4">Find new friends</h1>
      {/* Friends Cards */}
      <div className="flex gap-5 flex-wrap ml-20">
        {users &&
          users.map((user) => (
            <FriendCard
              key={user._id}
              friend_id={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              friendStatus="Non_Friend"
            />
          ))}
      </div>
    </div>
  );
};

export default FriendsHome;

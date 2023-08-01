import React, { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import { useAuthContext } from "../hooks/useAuthContext";

const FriendsHome = () => {
  const [users, setUsers] = useState([]);
  const [cardStatus, setCardStatus] = useState("");

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
      setUsers([" ", "", " "]);
      setCardStatus("loading");
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

      if (response.ok) {
        setUsers(json);
        setCardStatus("");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-14 py-10 w-4/5 ">
      {/* Header */}
      <h1 className="text-3xl font-semibold pb-4">Find new friends</h1>
      {/* Friends Cards */}
      <div className="flex gap-5 flex-wrap ml-20">
        {cardStatus == "loading" ? (
          <>
            {" "}
            {users.map((user) => (
              <FriendCard key={user._id} cardStatus="loading" />
            ))}{" "}
          </>
        ) : (
          <>
            {users.length !== 0 ? (
              <>
                {" "}
                {users.map((user) => (
                  <FriendCard
                    key={user._id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    friend_id={user._id}
                    userImage={user.profileImg.url}
                    friendStatus="Non_Friend"
                  />
                ))}{" "}
              </>
            ) : (
              <h3 className="text-xl"> No friends to add </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsHome;

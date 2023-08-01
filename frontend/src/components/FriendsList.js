import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import FriendCard from "./FriendCard";

const FriendsList = () => {
  const { user } = useAuthContext();
  const [friends, setFriends] = useState([]);
  const [cardStatus, setCardStatus] = useState("");

  useEffect(() => {
    const userFriends_ids = user.friends_ids;

    const fetchFriends = async () => {
      setFriends([" ", "", " "]);
      setCardStatus("loading");
      const response = await fetch("http://localhost:4000/user/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userFriends_ids }),
      });

      const json = await response.json();

      if (response.ok) {
        setFriends(json);
        setCardStatus("");
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="px-14 py-10 w-4/5 ">
      <h1 className="text-3xl font-semibold pb-4">Friends</h1>

      <div className="flex gap-5 flex-wrap ml-20">
        {cardStatus == "loading" ? (
          <>
            {friends.map((friend) => (
              <FriendCard key={friend._id} cardStatus="loading" />
            ))}
          </>
        ) : (
          <>
            {friends.length !== 0 ? (
              friends.map((friend) => (
                <FriendCard
                  key={friend._id}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  friend_id={friend._id}
                  userImage={friend.profileImg.url}
                  friendStatus="Friend"
                />
              ))
            ) : (
              <h2 className="text-xl"> No friends yet</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsList;

import React from "react";
import FriendCard from "./FriendCard";

const FriendsHome = () => {
  return (
    <div className="px-14 py-10 w-4/5 ">
      {/* Header */}
      <h1 className="text-3xl font-semibold pb-4">Find new friends</h1>
      {/* Friends Cards */}
      <div className="flex gap-5 flex-wrap ml-20">
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />

        <FriendCard />
      </div>
    </div>
  );
};

export default FriendsHome;

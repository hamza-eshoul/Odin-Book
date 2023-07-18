import React from "react";
import odinBookLogo from "../images/odin-book.jpeg";

const FriendCard = () => {
  return (
    <div className="flex flex-col w-[218px] shadow-lg rounded-xl border-[0.5px] border-zinc-200 bg-white">
      {/* image */}
      <img
        src={odinBookLogo}
        alt="Profile Image"
        className="w-full h-[218px] rounded-t-lg"
      />

      {/* Name */}
      <h2 className="font-semibold text-lg px-2 pt-2 text-center">
        {" "}
        Hamza Eshoul{" "}
      </h2>

      {/* Add Friend Button */}
      <button className="text-blue-600 bg-blue-100/50 hover:bg-blue-100 py-2 mx-3 rounded-lg my-4">
        {" "}
        Add Friend
      </button>
    </div>
  );
};

export default FriendCard;

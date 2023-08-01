import React from "react";
import defaultProfile from "../images/defaultProfile.png";
import { useNavigate } from "react-router-dom";

const FriendSmallCard = ({ friend_id, firstName, lastName, profileImg }) => {
  const navigate = useNavigate();
  const navigateToFriendProfile = () => {
    navigate(`/profile/${friend_id}/`);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <div
        className="w-24 h-24 hover:opacity-90"
        onClick={() => {
          navigateToFriendProfile();
        }}
      >
        <img
          src={profileImg ? profileImg : defaultProfile}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      <h3
        className="font-medium text-sm hover:underline text-center"
        onClick={() => {
          navigateToFriendProfile();
        }}
      >
        {firstName} {lastName}{" "}
      </h3>
    </div>
  );
};

export default FriendSmallCard;

import React from "react";
import defaultProfile from "../assets/images/defaultProfile.png";
import { useNavigate } from "react-router-dom";

const FriendSmallCard = ({ friend_id, firstName, lastName, profileImg }) => {
  const navigate = useNavigate();
  const navigateToFriendProfile = () => {
    navigate(`/profile/${friend_id}/`);
    window.location.reload();
  };

  return (
    <div className="flex cursor-pointer flex-col gap-2">
      <div
        className="h-24 w-24 hover:opacity-90"
        onClick={() => {
          navigateToFriendProfile();
        }}
      >
        <img
          src={profileImg ? profileImg : defaultProfile}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <h3
        className="text-center text-sm font-medium hover:underline"
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

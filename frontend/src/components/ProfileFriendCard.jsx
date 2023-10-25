import { useNavigate } from "react-router-dom";

// images
import defaultProfile from "../assets/images/defaultProfile.png";

const ProfileFriendCard = ({
  friend_id,
  firstName,
  lastName,
  profileImg,
  isRowCard = false,
}) => {
  const navigate = useNavigate();

  const navigateToFriendProfile = () => {
    navigate(`/profile/${friend_id}/`);
    window.location.reload();
  };

  return (
    <article
      className={`flex cursor-pointer ${
        isRowCard ? "flex-row gap-6" : "flex-col gap-2"
      } items-center`}
    >
      <img
        src={profileImg ? profileImg : defaultProfile}
        className="h-24 w-24 rounded-lg object-cover hover:opacity-90"
        onClick={() => {
          navigateToFriendProfile();
        }}
      />

      <span
        className={`text-center ${
          isRowCard ? "text-[17px]" : "text-sm"
        } font-medium hover:underline`}
        onClick={() => {
          navigateToFriendProfile();
        }}
      >
        {firstName} {lastName}{" "}
      </span>
    </article>
  );
};

export default ProfileFriendCard;

import { Link } from "react-router-dom";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// components
import LoadingFriendCard from "../../components/LoadingFriendCard";

const FriendCard = ({
  firstName,
  lastName,
  id,
  profile_image,
  isCardLoading,
}) => {
  if (isCardLoading) {
    return <LoadingFriendCard />;
  }

  return (
    <article className="flex w-[230px] flex-col items-center rounded-xl border-[1px] border-zinc-200 bg-white shadow-lg">
      <img
        src={profile_image ? profile_image : defaultProfile}
        alt="Profile"
        className="object-fit h-[240px] w-full rounded-t-lg"
      />

      <Link
        to={`/profile/${id}/`}
        className="px-2 pt-2 text-center text-lg font-semibold hover:underline"
      >
        {firstName} {lastName}
      </Link>

      <Link
        className="m-3 w-[80%] rounded-lg  bg-blue-100/50 px-2.5 py-2 text-center text-blue-600 hover:bg-blue-100"
        to={`/profile/${id}/`}
      >
        View Profile
      </Link>
    </article>
  );
};

export default FriendCard;

import { Link } from "react-router-dom";
import { useCancelFriendRequest } from "../../hooks/useCRUD/useCancelFriendRequest";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// components
import LoadingFriendCard from "../../components/LoadingFriendCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const SentFriendsRequestCard = ({
  firstName,
  lastName,
  id,
  profile_image,
  isCardLoading,
}) => {
  const { cancelFriendRequest, isPending, isRequestCancelled, error } =
    useCancelFriendRequest();

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

      {isRequestCancelled && (
        <div className="pointer-events-none m-3 w-[80%] rounded-lg bg-zinc-200 px-2.5 py-2 text-center text-zinc-400">
          Request cancelled
        </div>
      )}

      {!isRequestCancelled && (
        <button
          className="m-3 w-[80%] rounded-lg bg-blue-100/50 px-2.5 py-2 text-blue-600 hover:bg-blue-100"
          onClick={() => cancelFriendRequest(id)}
        >
          {isPending && <Loading loadingColor={"#0066dd"} />}
          {!isPending && <span>Cancel Request </span>}
        </button>
      )}

      {error && <Error error={error} />}
    </article>
  );
};

export default SentFriendsRequestCard;

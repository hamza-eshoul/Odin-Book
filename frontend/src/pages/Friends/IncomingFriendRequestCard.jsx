import { Link } from "react-router-dom";
import { useAcceptFriendRequest } from "../../hooks/useCRUD/useAcceptFriendRequest";
import { useRejectFriendRequest } from "../../hooks/useCRUD/useRejectFriendRequest";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// components
import LoadingFriendCard from "../../components/LoadingFriendCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const IncomingFriendRequestCard = ({
  firstName,
  lastName,
  id,
  profile_image,
  isCardLoading,
}) => {
  const {
    acceptFriendRequest,
    isPending: isAcceptPending,
    isRequestAccepted,
    error: isAcceptError,
  } = useAcceptFriendRequest();
  const {
    rejectFriendRequest,
    isPending: isRejectPending,
    isRequestRejected,
    error: isRejectError,
  } = useRejectFriendRequest();

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
      {(isAcceptPending || isRejectPending) && <Loading />}
      {isRequestAccepted && (
        <div className="pointer-events-none m-3 w-[80%] rounded-lg bg-zinc-200 px-2.5 py-2 text-center text-zinc-400">
          Request accepted
        </div>
      )}
      {isRequestRejected && (
        <div className="pointer-events-none m-3 w-[80%] rounded-lg bg-zinc-200 px-2.5 py-2 text-center text-zinc-400">
          Request rejected
        </div>
      )}

      {!isAcceptPending &&
        !isRejectPending &&
        !isRequestAccepted &&
        !isRequestRejected && (
          <div className="flex justify-center gap-4">
            <button
              className="m-3 rounded-lg bg-blue-100/50 px-3  py-2.5 text-blue-600 hover:bg-blue-100"
              onClick={() => acceptFriendRequest(id)}
            >
              Accept
            </button>
            <button
              className="m-3 rounded-lg bg-zinc-100 px-3  py-2.5 text-red-500 hover:bg-zinc-200"
              onClick={() => rejectFriendRequest(id)}
            >
              Reject
            </button>
          </div>
        )}
      {isAcceptError && <Error error={isAcceptError} />}
      {isRejectError && <Error error={isRejectError} />}
    </article>
  );
};

export default IncomingFriendRequestCard;

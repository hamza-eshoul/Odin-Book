import { useEffect, useState } from "react";
import { useSendFriendRequest } from "../../hooks/useCRUD/useSendFriendRequest";
import { useCancelFriendRequest } from "../../hooks/useCRUD/useCancelFriendRequest";
import { useDeleteFriend } from "../../hooks/useCRUD/useDeleteFriend";

// icons
import { TbFriendsOff } from "react-icons/tb";
import { LiaUserFriendsSolid } from "react-icons/lia";

// components
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const ProfileHeaderFriendButton = ({ profile, user }) => {
  const [friendStatus, setFriendStatus] = useState(null);
  const {
    sendFriendRequest,
    isPending: sendFrIsPending,
    isFriendRequest,
    error: sendFrError,
  } = useSendFriendRequest();
  const {
    cancelFriendRequest,
    isPending: cancelFrIsPending,
    isRequestCancelled,
    error: cancelFrError,
  } = useCancelFriendRequest();
  const {
    deleteFriend,
    isPending: deleteFrIsPending,
    isFriendDeleted,
    error: deleteFrError,
  } = useDeleteFriend();

  const profile_id = profile._id;

  useEffect(() => {
    const checkAndAssignFriendStatus = () => {
      if (user.friends_ids.includes(profile_id)) {
        setFriendStatus("friend");
      }
      if (!user.friends_ids.includes(profile_id)) {
        setFriendStatus("non_friend");
      }
      if (user.sent_friends_requests.includes(profile_id)) {
        setFriendStatus("sent_friend_request");
      }

      if (user.incoming_friends_requests.includes(profile_id)) {
        setFriendStatus("incoming_friend_request");
      }
    };

    checkAndAssignFriendStatus();
  }, []);

  return (
    <>
      {friendStatus == "friend" && (
        <>
          {!isFriendDeleted && (
            <>
              {" "}
              <button
                className="flex items-center justify-center gap-2 rounded-md bg-zinc-100 px-4 py-1.5 text-lg text-red-500 hover:bg-zinc-200"
                onClick={() => {
                  deleteFriend(profile_id);
                }}
              >
                {deleteFrIsPending && <Loading />}

                {!deleteFrIsPending && (
                  <>
                    <TbFriendsOff className="text-xl" />
                    <span className="pt-0.5">Delete Friend</span>
                  </>
                )}
              </button>{" "}
              {deleteFrError && <Error error={deleteFrError} />}
            </>
          )}
          {isFriendDeleted && (
            <button className="pointer-events-none rounded-md bg-zinc-200 px-4 py-1.5 text-zinc-400 ">
              <span className="pt-0.5">Friend Deleted</span>
            </button>
          )}
        </>
      )}

      {friendStatus == "non_friend" && (
        <>
          {!isFriendRequest && (
            <>
              {" "}
              <button
                className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-1.5 text-lg text-white hover:bg-blue-500"
                onClick={() => {
                  sendFriendRequest(profile_id);
                }}
              >
                {sendFrIsPending && <Loading loadingColor={"white"} />}

                {!sendFrIsPending && (
                  <>
                    <LiaUserFriendsSolid className="text-xl" />
                    <span className="pt-0.5">Add Friend</span>
                  </>
                )}
              </button>{" "}
              {sendFrError && <Error error={sendFrError} />}
            </>
          )}
          {isFriendRequest && (
            <button className="pointer-events-none rounded-md bg-zinc-200 px-4 py-1.5 text-zinc-400 ">
              <span className="pt-0.5">Friend Request sent</span>
            </button>
          )}
        </>
      )}

      {friendStatus == "sent_friend_request" && (
        <>
          {!isRequestCancelled && (
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-blue-100/50 px-4 py-1.5  text-lg text-blue-600 hover:bg-blue-100"
              onClick={() => {
                cancelFriendRequest(profile_id);
              }}
            >
              {cancelFrIsPending && <Loading loadingColor={"#0066dd"} />}
              {!cancelFrIsPending && <span>Cancel Request </span>}
              {cancelFrError && <Error error={cancelFrError} />}
            </button>
          )}

          {isRequestCancelled && (
            <button className="pointer-events-none rounded-md bg-zinc-200 px-4 py-1.5 text-zinc-400 ">
              <span className="pt-0.5">Request cancelled</span>
            </button>
          )}
        </>
      )}

      {friendStatus == "incoming_friend_request" && (
        <button className="pointer-events-none rounded-md bg-zinc-200 px-4 py-1.5 text-zinc-400 ">
          <span className="pt-0.5"> Incoming Friend Request</span>
        </button>
      )}
    </>
  );
};

export default ProfileHeaderFriendButton;

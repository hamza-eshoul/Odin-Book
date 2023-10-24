import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchnNonFriends } from "../hooks/useFetch/useFetchNonFriends";

// images
import defaultProfile from "../assets/images/defaultProfile.png";

// components
import Loading from "./Loading";
import Error from "./Error";

const SuggestedFriends = () => {
  const [shuffledAndSlicedNonFriendsList, setShuffledAndSlicedNonFriendsList] =
    useState(null);
  const { nonFriendsList, isPending, error } = useFetchnNonFriends();

  const shuffleAndSliceNonFriendsList = (non_friends_list) => {
    return non_friends_list.sort(() => Math.random() - 0.5).slice(0, 6);
  };

  useEffect(() => {
    if (nonFriendsList) {
      const transformedNonFriendsList =
        shuffleAndSliceNonFriendsList(nonFriendsList);

      setShuffledAndSlicedNonFriendsList(transformedNonFriendsList);
    }
  }, [nonFriendsList]);

  return (
    <ul className="space-y-2">
      {isPending && <Loading loadingColor={"gray"} loadingHeight={"h-full"} />}
      {error && (
        <Error
          error={error}
          errorSize={"text-lg"}
          errorColor={"text-mainBlue"}
        />
      )}
      {!isPending &&
        shuffledAndSlicedNonFriendsList &&
        shuffledAndSlicedNonFriendsList.map((non_friend) => (
          <li>
            <Link
              to={`/profile/${non_friend._id}/`}
              key={non_friend._id}
              className="flex cursor-pointer items-center gap-3 rounded p-2.5 hover:bg-zinc-100/60"
            >
              <div className="h-12 w-12">
                <img
                  src={
                    non_friend.profileImg.url
                      ? non_friend.profileImg.url
                      : defaultProfile
                  }
                  alt="non friend profile"
                  className="h-full w-full rounded-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-medium opacity-75">
                  {non_friend.firstName} {non_friend.lastName}
                </span>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default SuggestedFriends;

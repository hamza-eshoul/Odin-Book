import { useEffect, useState } from "react";
import HomepageAsideCard from "./HomepageAsideCard";
import { useFetchnNonFriends } from "../../hooks/useFetchNonFriends";
import { Link } from "react-router-dom";
import defaultProfile from "../../assets/images/defaultProfile.png";
import LatestPost from "./LatestPost";

import Search from "../../components/Search";

const HomepageRightAside = () => {
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
    <section className="flex w-[30%] flex-col items-center gap-6">
      <HomepageAsideCard title={"Find Your Friends"}>
        <Search />
      </HomepageAsideCard>

      <HomepageAsideCard title={"Suggested Friends"}>
        <ul className="space-y-2">
          {shuffledAndSlicedNonFriendsList &&
            shuffledAndSlicedNonFriendsList.map((non_friend) => (
              <li>
                <Link
                  to={`/profile/${non_friend._id}`}
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
      </HomepageAsideCard>

      <LatestPost />
    </section>
  );
};

export default HomepageRightAside;

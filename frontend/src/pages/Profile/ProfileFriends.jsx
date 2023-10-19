import { useEffect, useState } from "react";

import defaultProfile from "../../assets/images/defaultProfile.png";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const ProfileFriends = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useOutletContext();
  const [friendsLoading, setFriendsLoading] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      setFriendsLoading(true);
      const userFriends_ids = currentUser.friends_ids;

      const response = await fetch("http://localhost:4000/user/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userFriends_ids }),
      });

      const json = await response.json();

      if (response.ok) {
        setFriends(json);
        setFriendsLoading(null);
      }
    };

    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  const navigateToProfile = (friend) => {
    navigate(`/profile/${friend._id}/`);
    window.location.reload();
  };

  return (
    <main>
      <div className="mx-auto mt-5 flex w-[65%] flex-col gap-4 rounded-md border-[1px] border-zinc-200 bg-white px-3 py-4 shadow">
        <h1 className="px-3 text-2xl font-semibold"> Friends </h1>
        {/* Friends Cards */}

        {friendsLoading ? (
          <div className="flex items-center justify-center">
            <MoonLoader
              color={"#3c82f6"}
              loading={friendsLoading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {" "}
            {friends.length !== 0 ? (
              <div className="flex flex-wrap gap-4">
                {friends.map((friend) => (
                  <div
                    key={friend._id}
                    className="flex w-[48%] items-center gap-3 rounded border-[1px] border-zinc-100"
                  >
                    {" "}
                    {/* Friend Image */}
                    <div
                      className="h-32 w-32 cursor-pointer p-3 hover:opacity-90"
                      onClick={() => {
                        navigateToProfile(friend);
                      }}
                    >
                      <img
                        src={
                          friend.profileImg.url
                            ? friend.profileImg.url
                            : defaultProfile
                        }
                        className="h-full w-full rounded object-cover"
                      />
                    </div>
                    {/* Friend Name */}
                    <h3
                      className="cursor-pointer text-lg font-medium hover:underline"
                      onClick={() => {
                        navigateToProfile(friend);
                      }}
                    >
                      {" "}
                      {friend.firstName} {friend.lastName}{" "}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-3"> You have no friends yet ...</div>
            )}{" "}
          </>
        )}
      </div>
    </main>
  );
};

export default ProfileFriends;

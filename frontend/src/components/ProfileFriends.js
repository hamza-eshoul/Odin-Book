import { useEffect, useState } from "react";

import defaultProfile from "../images/defaultProfile.png";
import { useNavigate, useOutletContext } from "react-router-dom";

const ProfileFriends = () => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      const userFriends_ids = currentUser.friends_ids;

      const response = await fetch("http://localhost:4000/user/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userFriends_ids }),
      });

      const json = await response.json();

      setFriends(json);
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
    <main className="w-[65%] mx-auto flex flex-col gap-4 bg-white rounded-lg shadow mt-5 px-3 py-4">
      <h1 className="font-semibold text-2xl p-3"> Friends </h1>
      {/* Friends Cards */}
      {friends.length !== 0 ? (
        <div className="flex flex-wrap gap-4">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center gap-3 border-[1px] border-zinc-100 rounded w-[48%]"
            >
              {" "}
              {/* Friend Image */}
              <div
                className="h-32 w-32 p-3 cursor-pointer hover:opacity-90"
                onClick={() => {
                  navigateToProfile(friend);
                }}
              >
                <img
                  src={defaultProfile}
                  className="h-full w-full object-cover rounded"
                />
              </div>
              {/* Friend Name */}
              <h3
                className="text-lg font-medium hover:underline cursor-pointer"
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
    </main>
  );
};

export default ProfileFriends;

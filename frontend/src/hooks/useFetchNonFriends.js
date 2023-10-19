import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchnNonFriends = () => {
  const [nonFriendsList, setNonFriendsList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const generateUserAndFriendsIdsArray = () => {
    const userFriends_ids = user.friends_ids;
    const userSentRequests = user.sent_friends_requests;
    const userIncomingRequests = user.incoming_friends_requests;
    const user_id = user._id;

    return userFriends_ids.concat(
      userSentRequests,
      userIncomingRequests,
      user_id,
    );
  };

  const fetchNonFriendsList = async () => {
    setIsPending(true);
    setError(null);

    const user_and_friends_ids = generateUserAndFriendsIdsArray();

    const response = await fetch(
      "http://localhost:4000/user/non_friends_users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_and_friends_ids }),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setNonFriendsList(json);
    }
  };

  useEffect(() => {
    fetchNonFriendsList();
  }, []);

  return { nonFriendsList, isPending, error };
};

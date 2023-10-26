import { useState, useEffect } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchIncomingFriendsRequests = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [incomingFriendsRequests, setIncomingFriendsRequests] = useState(null);

  const { user } = useAuthContext();

  const user_id = user._id;

  const fetchIncomingFriendsRequests = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `https://odin-book-api-g5zs.onrender.com/users/${user_id}/incoming_friend_requests`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setIncomingFriendsRequests(json);
    }
  };

  useEffect(() => {
    fetchIncomingFriendsRequests();
  }, []);

  return { incomingFriendsRequests, isPending, error };
};

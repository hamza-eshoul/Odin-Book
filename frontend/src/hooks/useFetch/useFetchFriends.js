import { useState, useEffect } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchFriends = (user_id) => {
  const [friendsList, setFriendsList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const fetchFriendsList = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `https://odin-book-api-g5zs.onrender.com/${user_id}/friends`,
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
      setFriendsList(json);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchFriendsList();
    }
  }, [user_id]);

  return { friendsList, isPending, error };
};

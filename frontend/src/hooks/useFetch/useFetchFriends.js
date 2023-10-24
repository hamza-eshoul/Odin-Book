import { useState, useEffect } from "react";

export const useFetchFriends = (user_id) => {
  const [friendsList, setFriendsList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchFriendsList = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/users/${user_id}/friends`,
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

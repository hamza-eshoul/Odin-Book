import { useState, useEffect } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchnNonFriends = () => {
  const [nonFriendsList, setNonFriendsList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const fetchNonFriendsList = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/users/${user._id}/non_friends`,
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
      setNonFriendsList(json);
    }
  };

  useEffect(() => {
    fetchNonFriendsList();
  }, []);

  return { nonFriendsList, isPending, error };
};

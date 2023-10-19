import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchAllUsers = () => {
  const [usersList, setUsersList] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const fetchAllUsers = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/user/all_users");

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      const filtered_users = json.filter(
        (fetched_user) => fetched_user._id !== user._id,
      );
      setUsersList(filtered_users);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return { usersList, isPending, error };
};

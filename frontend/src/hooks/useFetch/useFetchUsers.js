import { useState, useEffect } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchUsers = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [usersList, setUsersList] = useState(null);

  const { user } = useAuthContext();

  const fetchUsers = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/users", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

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
    fetchUsers();
  }, []);

  return { usersList, isPending, error };
};

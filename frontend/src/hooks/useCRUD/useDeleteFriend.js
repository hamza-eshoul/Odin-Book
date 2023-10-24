import { useState } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useDeleteFriend = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isFriendDeleted, setIsFriendDeleted] = useState(false);
  const { user, dispatch } = useAuthContext();

  const user_id = user._id;

  const deleteFriend = async (friend_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/users/delete_friend", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, friend_id }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setIsFriendDeleted(true);
      dispatch({ type: "UPDATE_USER", payload: json });
    }
  };

  return { deleteFriend, isPending, isFriendDeleted, error };
};
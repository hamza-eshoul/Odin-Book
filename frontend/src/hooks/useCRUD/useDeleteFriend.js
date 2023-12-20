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

    const response = await fetch(
      `https://odin-book-api-g5zs.onrender.com/users/${user_id}/friends/${friend_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
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
      setIsFriendDeleted(true);
      dispatch({
        type: "UPDATE_USER",
        payload: { ...json, token: user.token },
      });
    }
  };

  return { deleteFriend, isPending, isFriendDeleted, error };
};

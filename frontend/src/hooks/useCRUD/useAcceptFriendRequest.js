import { useState } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useAcceptFriendRequest = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);
  const { user, dispatch } = useAuthContext();

  const user_id = user._id;

  const acceptFriendRequest = async (friend_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/users/${user_id}/accept_friend_request`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friend_id }),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setIsRequestAccepted(true);
      dispatch({
        type: "UPDATE_USER",
        payload: { ...json, token: user.token },
      });
    }
  };

  return { acceptFriendRequest, isPending, isRequestAccepted, error };
};

import { useState } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useSendFriendRequest = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isFriendRequest, setIsFriendRequest] = useState(false);
  const { user, dispatch } = useAuthContext();

  const user_id = user._id;

  const sendFriendRequest = async (friend_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/users/${user_id}/send_friend_request`,
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
      setIsFriendRequest(true);
      dispatch({
        type: "UPDATE_USER",
        payload: { ...json, token: user.token },
      });
    }
  };

  return { sendFriendRequest, isFriendRequest, isPending, error };
};

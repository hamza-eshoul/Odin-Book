import { useState, useEffect } from "react";
import { usePostContext } from "../useContext/usePostContext";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchProfilePosts = (profile_id) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  const fetchProfilePosts = async () => {
    setIsPending(true);
    setError(null);
    dispatch({ type: "RESET_POSTS" });

    const response = await fetch(
      `https://odin-book-api-g5zs.onrender.com/posts/profile_posts/${profile_id}`,
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
      dispatch({ type: "SET_POSTS", payload: json });
    }
  };

  useEffect(() => {
    fetchProfilePosts();
  }, []);

  return { isPending, error };
};

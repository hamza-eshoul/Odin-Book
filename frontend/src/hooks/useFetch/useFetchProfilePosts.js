import { useState, useEffect } from "react";
import { usePostContext } from "../useContext/usePostContext";

export const useFetchProfilePosts = (profile_id) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = usePostContext();

  const fetchProfilePosts = async () => {
    setIsPending(true);
    setError(null);
    dispatch({ type: "RESET_POSTS" });

    const response = await fetch(
      `http://localhost:4000/posts/profile_posts/${profile_id}`,
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

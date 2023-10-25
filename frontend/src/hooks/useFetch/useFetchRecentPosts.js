import { useState, useEffect } from "react";
import { usePostContext } from "../useContext/usePostContext";

export const useFetchRecentPosts = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = usePostContext();

  const fetchRecentPosts = async () => {
    setIsPending(true);
    setError(null);
    dispatch({ type: "RESET_POSTS" });

    const response = await fetch("http://localhost:4000/posts");

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      const recent_posts_10 = json.slice(0, 10);
      setIsPending(false);
      dispatch({ type: "SET_POSTS", payload: recent_posts_10 });
    }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  return { isPending, error };
};

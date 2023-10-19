import { useState, useEffect } from "react";

export const useFetchRecentPosts = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  const fetchRecentPosts = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/posts");

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setRecentPosts(json);
    }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  return { recentPosts, isPending, error };
};

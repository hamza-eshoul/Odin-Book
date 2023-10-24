import { useEffect, useState } from "react";

export const useFetchPostComments = (post_id) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [postComments, setPostComments] = useState(null);

  const fetchPostComments = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/posts/comments/${post_id}`,
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setPostComments(json);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, []);

  return { postComments, isPending, error, setPostComments };
};
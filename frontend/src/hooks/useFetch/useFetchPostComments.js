import { useEffect, useState } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchPostComments = (post_id) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [postComments, setPostComments] = useState(null);
  const { user } = useAuthContext();

  const fetchPostComments = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `https://odin-book-api-g5zs.onrender.com/posts/${post_id}/comments`,
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
      setPostComments(json);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, []);

  return { postComments, isPending, error, setPostComments };
};

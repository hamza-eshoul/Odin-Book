import { useState } from "react";
import { usePostContext } from "../useContext/usePostContext";

export const useDeletePost = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = usePostContext();

  const deletePost = async (post_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/posts/delete_post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return { deletePost, isPending, error };
};

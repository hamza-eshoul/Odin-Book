import { useState } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useDeletePostComment = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const deletePostComment = async (comment_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/posts/comments/${comment_id}`,
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
      return json;
    }
  };

  return { deletePostComment, isPending, error };
};

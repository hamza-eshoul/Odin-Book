import { useState } from "react";

export const useDeletePostComment = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const deletePostComment = async (comment_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/posts/comments/${comment_id}`,
      {
        method: "DELETE",
        headers: {
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

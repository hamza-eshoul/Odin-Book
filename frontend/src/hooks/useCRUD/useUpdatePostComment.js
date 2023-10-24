import { useState } from "react";

export const useUpdatePostComment = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const updatePostComment = async (comment_id, updated_comment_content) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/posts/comments/update_comment",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id, updated_comment_content }),
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

  return { updatePostComment, isPending, error };
};

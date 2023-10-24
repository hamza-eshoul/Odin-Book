import { useState } from "react";

export const useAddPostComment = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const addPostComment = async (author, content, post_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/posts/comments/add_comment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, content, post_id }),
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

  return { addPostComment, isPending, error };
};

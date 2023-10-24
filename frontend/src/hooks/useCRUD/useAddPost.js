import { useState } from "react";
import { usePostContext } from "../useContext/usePostContext";

export const useAddPost = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = usePostContext();

  const addPost = async (author, content, image) => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author, content, image }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      dispatch({ type: "CREATE_POST", payload: json });
    }
  };

  return { addPost, isPending, error };
};

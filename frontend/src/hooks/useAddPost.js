import { useState } from "react";
import { usePostContext } from "./usePostContext";

export const useAddPost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = usePostContext();

  const addPost = async (author, content) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author, content }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "CREATE_POST", payload: json });
    }
  };

  return { addPost, error, isLoading };
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../useContext/useAuthContext";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      "https://odin-book-api-g5zs.onrender.com/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      navigate("/homepage");
    }
  };

  return { login, isPending, error };
};

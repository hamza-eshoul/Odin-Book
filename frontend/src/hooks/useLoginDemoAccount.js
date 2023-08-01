import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLoginDemoAccount = () => {
  const [demoError, setDemoError] = useState(null);
  const [isDemoLoading, setIsDemoLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const loginDemoAccount = async () => {
    setIsDemoLoading(true);
    setDemoError(null);

    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "hamza.eshoul.pro@gmail.com",
        password: "Hamzahamza1",
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsDemoLoading(false);
      setDemoError(json.error);
    }

    if (response.ok) {
      setIsDemoLoading(false);

      // save the user to localstorage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // navigate to homepage
      navigate("/homepage");
    }
  };

  return { loginDemoAccount, demoError, isDemoLoading };
};

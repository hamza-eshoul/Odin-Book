import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../useContext/useAuthContext";

export const useDemoAccountLogin = () => {
  const [isDemoPending, setIsDemoPending] = useState(false);
  const [demoError, setDemoError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const demoAccountLogin = async () => {
    setIsDemoPending(true);
    setDemoError(null);

    const response = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.REACT_APP_DEMO_EMAIL,
        password: process.env.REACT_APP_DEMO_PASSWORD,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsDemoPending(false);
      setDemoError(json.error);
    }

    if (response.ok) {
      setIsDemoPending(false);

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      navigate("/homepage");
    }
  };

  return { demoAccountLogin, isDemoPending, demoError };
};

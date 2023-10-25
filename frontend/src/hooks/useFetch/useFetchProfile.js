import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchProfile = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const { user } = useAuthContext();

  const user_id = location.pathname.split("/")[2];

  const fetchProfile = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setProfile(json);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, setProfile, isPending, error };
};

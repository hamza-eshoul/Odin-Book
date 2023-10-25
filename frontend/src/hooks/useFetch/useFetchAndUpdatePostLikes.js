import { useEffect, useState } from "react";
import { useAuthContext } from "../useContext/useAuthContext";

export const useFetchAndUpdatePostLikes = (post_id) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [postLikesNbr, setPostLikesNbr] = useState("...");
  const [isPostLiked, setIsPostLiked] = useState(false);
  const { user } = useAuthContext();

  const user_id = user._id;

  const fetchPostLikes = async () => {
    const response = await fetch(`http://localhost:4000/posts/${post_id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    setPostLikesNbr(json.usersLikes.length);

    json.usersLikes.map((like) => {
      if (like === user_id) {
        setIsPostLiked(true);
      } else {
        setIsPostLiked(false);
      }
    });
  };

  const updatePostLikes = async (post_id) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      `http://localhost:4000/posts/${post_id}/post_likes`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setPostLikesNbr(json.usersLikes.length);
      checkAndUpdateIsPostLikedByUser(json, user_id);
    }
  };

  const checkAndUpdateIsPostLikedByUser = (post, user_id) => {
    if (post.usersLikes.length === 0) {
      setIsPostLiked(false);
    } else {
      post.usersLikes.map((like) => {
        if (like === user_id) {
          setIsPostLiked(true);
        } else {
          setIsPostLiked(false);
        }
      });
    }
  };

  useEffect(() => {
    if (post_id) {
      fetchPostLikes();
    }
  }, [post_id]);

  return { updatePostLikes, postLikesNbr, isPostLiked, isPending, error };
};

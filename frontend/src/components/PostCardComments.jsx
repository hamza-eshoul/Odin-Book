import { useEffect } from "react";

import { useFetchPostComments } from "../hooks/useFetch/useFetchPostComments";

// components
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import Error from "./Error";
import AddPostCardComment from "./AddPostCardComment";

const PostCardComments = ({ user, post_id, showComments, setCommentsNbr }) => {
  const { postComments, isPending, error, setPostComments } =
    useFetchPostComments(post_id);

  useEffect(() => {
    if (postComments) {
      setCommentsNbr(postComments.length);
    }
  }, [postComments]);

  if (!showComments) {
    return null;
  }

  return (
    <div className="px-6">
      <AddPostCardComment
        user={user}
        post_id={post_id}
        setCommentsNbr={setCommentsNbr}
        setPostComments={setPostComments}
      />

      <div className="flex flex-col gap-4 pb-5 pt-2">
        <h3 className="text-black/60"> All Comments </h3>

        {isPending && (
          <Loading loadingColor={"gray"} loadingHeight={"h-full"} />
        )}
        {error && (
          <Error
            error={error}
            errorSize={"text-lg"}
            errorColor={"text-mainBlue"}
          />
        )}

        {!isPending &&
          postComments &&
          postComments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment_id={comment._id}
              author={comment.author}
              content={comment.content}
              date={comment.createdAt}
              setPostComments={setPostComments}
            />
          ))}
      </div>
    </div>
  );
};

export default PostCardComments;

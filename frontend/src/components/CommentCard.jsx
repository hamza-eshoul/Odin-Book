import { useState } from "react";
import { Link } from "react-router-dom";
import formatDate from "../utility/formatDate";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import { useDeletePostComment } from "../hooks/useCRUD/useDeletePostComment";
import { useUpdatePostComment } from "../hooks/useCRUD/useUpdatePostComment";

// images
import defaultProfile from "../assets/images/defaultProfile.png";

// components
import Error from "./Error";

const CommentCard = ({
  comment_id,
  author,
  content,
  date,
  setPostComments,
}) => {
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentUpdateContent, setCommentUpdateContent] = useState(content);
  const { deletePostComment, isPending, error } = useDeletePostComment();
  const {
    updatePostComment,
    isPending: updateIsPending,
    error: updateError,
  } = useUpdatePostComment();
  const { user } = useAuthContext();

  const formattedCommentDate = formatDate(date);

  const handleDeleteComment = async (comment_id) => {
    const deleted_comment_id = await deletePostComment(comment_id);

    if (deleted_comment_id) {
      setPostComments((prevPostComments) =>
        prevPostComments.filter(
          (prevComment) => prevComment._id !== comment_id,
        ),
      );
    }
  };

  const handleUpdateComment = async (comment_id, updated_comment_content) => {
    const updatedPostComment = await updatePostComment(
      comment_id,
      updated_comment_content,
    );

    if (updatedPostComment) {
      setPostComments((prevPostComments) =>
        prevPostComments.map((prevComment) => {
          if (prevComment._id === updatedPostComment._id) {
            prevComment = updatedPostComment;
            return prevComment;
          } else {
            return prevComment;
          }
        }),
      );

      setIsUpdateComment(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={author.profileImg.url ? author.profileImg.url : defaultProfile}
        className="object-fit mb-4 h-10 w-10 rounded-full"
        alt="profile"
      />

      <div className="flex flex-col gap-2">
        {" "}
        <div className="flex flex-col gap-1 rounded bg-zinc-100/60 px-3 py-2">
          <div className="flex gap-6">
            <Link
              className="cursor-pointer font-semibold hover:underline"
              reloadDocument
              to={`/profile/${author._id}/`}
            >
              {author.firstName} {author.lastName}
            </Link>
            <time className="text-sm text-black/60">
              {formattedCommentDate}{" "}
            </time>
          </div>

          {isUpdateComment && (
            <div className="flex gap-1">
              <input
                type="text"
                className="rounded py-1 outline-none"
                value={commentUpdateContent}
                onChange={(e) => setCommentUpdateContent(e.target.value)}
              />
              <button
                className="w-20 rounded bg-blue-600 px-1 py-1 text-sm font-semibold text-white transition duration-300 hover:bg-blue-500"
                onClick={() =>
                  handleUpdateComment(comment_id, commentUpdateContent)
                }
              >
                {updateIsPending ? "Updating" : "Update"}
              </button>
              {updateError && <Error error={updateError} />}
            </div>
          )}
          {!isUpdateComment && <p className="py-1"> {content}</p>}
        </div>
        <div className="flex gap-2 pl-4 text-sm font-medium text-black/50">
          {author._id === user._id && (
            <>
              <button onClick={() => setIsUpdateComment(!isUpdateComment)}>
                Edit
              </button>
              <button onClick={() => handleDeleteComment(comment_id)}>
                {isPending ? "Deleting ..." : "Delete"}
              </button>
              {error && <Error error={error} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

import { useState } from "react";
import { useAddPostComment } from "../hooks/useCRUD/useAddPostComment";

// images
import defaultProfile from "../assets/images/defaultProfile.png";

// components
import Error from "./Error";

const AddPostCardComment = ({
  user,
  post_id,
  setCommentsNbr,
  setPostComments,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const { addPostComment, isPending, error } = useAddPostComment();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = user._id;

    const addedComment = await addPostComment(author, commentContent, post_id);

    if (addedComment) {
      updatePostState(addedComment);
    }
  };

  const updatePostState = (addedComment) => {
    setPostComments((prevPostComments) => [...prevPostComments, addedComment]);
    setCommentsNbr((prevCommentNbr) => prevCommentNbr + 1);
    setCommentContent("");
  };

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <img
        src={user.profileImg.url ? user.profileImg.url : defaultProfile}
        alt="Profile"
        className="object-fit h-10 w-10 rounded-full"
      />

      <div className="flex w-full flex-col gap-3">
        <textarea
          placeholder="Write a comment..."
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
          className="h-14 resize-none rounded border-[1.5px] border-zinc-200 p-2 outline-none"
        />
        {commentContent.length > 0 && (
          <button className="w-20 rounded bg-blue-600 px-1 py-1 text-sm font-semibold text-white transition duration-300 hover:bg-blue-500">
            {isPending ? <span> Posting ...</span> : <span> Post </span>}
          </button>
        )}
        {error && <Error error={error} />}
      </div>
    </form>
  );
};

export default AddPostCardComment;

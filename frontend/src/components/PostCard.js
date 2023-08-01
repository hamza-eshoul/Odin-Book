import { BsThreeDots } from "react-icons/bs";
import defaultProfile from "../images/defaultProfile.png";
import { FcLike } from "react-icons/fc";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import CommentCard from "./CommentCard";
import { useAddComment } from "../hooks/useAddComment";
import { useAuthContext } from "../hooks/useAuthContext";

const PostCard = ({ author, content, date, post_id, isPostLoading }) => {
  const [formattedPostDate, setFormattedPostDate] = useState("");
  const [areCommentsActive, setAreCommentsActive] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [isPostLiked, setIsPostLiked] = useState(null);
  const [postLikesNbr, setPostLikesNbr] = useState();
  const [commentsNbr, setCommentsNbr] = useState(0);
  const { addComment, isLoading } = useAddComment();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPostLikes = async () => {
      const response = await fetch(`http://localhost:4000/post/${post_id}`);

      const json = await response.json();

      setPostLikesNbr(json.usersLikes.length);

      json.usersLikes.map((like) => {
        if (like === user._id) {
          setIsPostLiked(true);
        }
      });
    };

    if (!isPostLoading) {
      fetchPostLikes();
    }
  }, [isPostLoading, post_id, user._id]);

  useEffect(() => {
    const fetchPostComments = async () => {
      const response = await fetch("http://localhost:4000/post/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id }),
      });
      const json = await response.json();

      if (response.ok) {
        setCommentsNbr(json.length);
        setPostComments(json);
      }
    };

    if (!isPostLoading) {
      fetchPostComments();
    }
  }, [isPostLoading, post_id]);

  useEffect(() => {
    const formatDate = (date) => {
      const formattedDate = format(new Date(date), "PPP");
      return formattedDate;
    };

    if (!isPostLoading) {
      setFormattedPostDate(formatDate(date));
    }
  }, [date, isPostLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = user._id;

    const addedComment = await addComment(author, commentContent, post_id);

    setPostComments([addedComment, ...postComments]);
    setCommentsNbr(commentsNbr + 1);

    setCommentContent("");
  };

  const updatePostLikes = async () => {
    const user_id = user._id;

    const response = await fetch("http://localhost:4000/post/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id, user_id }),
    });

    const json = await response.json();

    setPostLikesNbr(json.usersLikes.length);

    if (json.usersLikes.length === 0) {
      setIsPostLiked(false);
    } else {
      json.usersLikes.map((like) => {
        if (like === user._id) {
          setIsPostLiked(true);
        } else {
          setIsPostLiked(false);
        }
      });
    }
  };

  return (
    <section className="flex flex-col gap-4 bg-white rounded-md py-2 px-6 shadow">
      {/* Header */}
      <header className="flex w-full justify-between items-center">
        <div className="flex gap-3">
          <div className="flex justify-center items-center">
            <div className="h-12 w-12">
              {isPostLoading ? (
                <div className="animate-pulse h-12 w-12 border-[1px] border-white bg-slate-200 rounded-full" />
              ) : (
                <img
                  src={
                    author.profileImg.url
                      ? author.profileImg.url
                      : defaultProfile
                  }
                  alt="Profile"
                  className="h-full w-full rounded-full cursor-pointer"
                />
              )}
            </div>
          </div>

          {isPostLoading ? (
            <div className="flex flex-col justify-center gap-2">
              <div className="w-20 h-2 animate-pulse  rounded bg-zinc-200" />
              <div className="w-20 h-2 animate-pulse  rounded bg-zinc-200" />
            </div>
          ) : (
            <div className="flex flex-col">
              {" "}
              <h3 className="text-lg font-semibold cursor-pointer">
                {author.firstName} {author.lastName}
              </h3>
              <p className=" text-slate-600 "> {formattedPostDate}</p>{" "}
            </div>
          )}
        </div>

        {isPostLoading ? (
          ""
        ) : (
          <BsThreeDots className="text-xl cursor-pointer " />
        )}
      </header>

      {/* Body */}
      {isPostLoading ? (
        <div className="w-full h-3 animate-pulse  rounded bg-zinc-200" />
      ) : (
        <div>{content}</div>
      )}

      {/* Likes and Comments Icons */}
      {isPostLoading ? (
        <div className="w-full h-3 animate-pulse  rounded bg-zinc-200" />
      ) : (
        <div className="flex justify-between text-slate-600">
          <div className="flex items-center gap-2">
            <FcLike className="text-2xl " />
            <span> {postLikesNbr} </span>
          </div>
          <p> {commentsNbr} comments </p>
        </div>
      )}

      {/* Likes and Comments Buttons */}
      {isPostLoading ? (
        <div className="w-full h-3 animate-pulse  rounded bg-zinc-200 mb-5" />
      ) : (
        <div className="flex border-t-[1px] border-slate-200 pt-2">
          <button
            className="flex justify-center items-center gap-2 w-1/2 hover:bg-sky-100/50 transition duraiton-300 rounded-md py-1.5"
            onClick={() => {
              updatePostLikes();
            }}
          >
            {" "}
            <AiOutlineLike className="text-xl" />
            {isPostLiked ? (
              <span className="font-medium text-slate-600 pt-1"> Liked ! </span>
            ) : (
              <span className="font-medium text-slate-600 pt-1"> Like </span>
            )}
          </button>

          <button
            className="flex justify-center items-center gap-2 w-1/2 hover:bg-sky-100/50 transition duraiton-300 rounded-md py-1.5"
            onClick={() => {
              setAreCommentsActive(!areCommentsActive);
            }}
          >
            {" "}
            <FaRegComment className="text-xl" />
            <span className="font-medium text-slate-600">Comment </span>
          </button>
        </div>
      )}

      {/* Comments */}
      {isPostLoading ? (
        ""
      ) : (
        <>
          {" "}
          {areCommentsActive && (
            <section>
              {/* Add Comment Section */}
              <form className="flex gap-3" onSubmit={handleSubmit}>
                {/* Comment Author Image */}
                <div className="h-10 w-10">
                  <img
                    src={
                      user.profileImg.url ? user.profileImg.url : defaultProfile
                    }
                    alt="Profile"
                    className="h-full w-full rounded-full object-fit"
                  />
                </div>

                <div className="flex flex-col w-full gap-3">
                  <textarea
                    placeholder="Write a comment..."
                    value={commentContent}
                    onChange={(e) => {
                      setCommentContent(e.target.value);
                    }}
                    className="resize-none border-[1.5px] border-zinc-200 rounded p-2 outline-none h-14"
                  />
                  {commentContent.length > 0 ? (
                    <button className="bg-blue-600 text-white rounded text-sm py-1 px-1 font-semibold hover:bg-blue-500 transition duration-300 w-20">
                      {isLoading ? <p> Posting ...</p> : <p> Post </p>}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </form>

              {/* All Comments */}
              <div className="flex flex-col gap-4 pt-2 pb-5">
                {/* Header */}
                <h3 className="text-black/60"> All Comments </h3>

                {/* List Of Comments */}
                {postComments.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    author={comment.author}
                    content={comment.content}
                    likes={comment.likes}
                    date={comment.createdAt}
                  />
                ))}
              </div>
            </section>
          )}{" "}
        </>
      )}
    </section>
  );
};

export default PostCard;

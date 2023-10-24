import { useState } from "react";
import { Link } from "react-router-dom";
import formatDate from "../utility/formatDate";
import { useFetchAndUpdatePostLikes } from "../hooks/useFetch/useFetchAndUpdatePostLikes";
import { useAuthContext } from "../hooks/useContext/useAuthContext";

// images
import defaultProfile from "../assets/images/defaultProfile.png";

// icons
import { FcLike } from "react-icons/fc";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

// components
import LoadingPostCard from "./LoadingPostCard";
import PostCardComments from "./PostCardComments";
import Error from "./Error";
import DeletePost from "./DeletePost";

const PostCard = ({ author, content, image, date, post_id, isPostLoading }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsNbr, setCommentsNbr] = useState("...");
  const [isDeletePost, setIsDeletePost] = useState(false);
  const { updatePostLikes, postLikesNbr, isPostLiked, isPending, error } =
    useFetchAndUpdatePostLikes(post_id);
  const { user } = useAuthContext();

  const formattedPostDate = !isPostLoading ? formatDate(date) : null;

  if (isPostLoading) {
    return <LoadingPostCard />;
  }

  return (
    <section className="flex flex-col gap-4 rounded-md border-[0.4px] border-zinc-100 bg-white py-3 shadow">
      <header className="relative flex w-full items-center justify-between px-6">
        <div className="flex gap-3">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12">
              <img
                src={
                  author.profileImg.url ? author.profileImg.url : defaultProfile
                }
                alt="Profile"
                className="h-full w-full cursor-pointer rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            {" "}
            <Link
              className="cursor-pointer font-semibold hover:underline"
              to={`/profile/${author._id}/`}
            >
              {author.firstName} {author.lastName}
            </Link>
            <p className="text-sm font-light text-zinc-600 ">
              {" "}
              {formattedPostDate}
            </p>{" "}
          </div>
        </div>

        <BsThreeDots
          className="cursor-pointer text-xl "
          onClick={() =>
            user._id === author._id ? setIsDeletePost(!isDeletePost) : ""
          }
        />
        {isDeletePost && (
          <DeletePost setIsDeletePost={setIsDeletePost} post_id={post_id} />
        )}
      </header>
      <div className="px-6">{content}</div>
      {image && (
        <div className="h-[380px] w-full">
          <img src={image} className="h-full w-full" alt="post" />
        </div>
      )}
      <div className="flex justify-between px-6 text-slate-600">
        <div className="flex items-center gap-2">
          <FcLike className="text-2xl " />
          <span> {postLikesNbr} </span>
        </div>
        <p
          className="cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          {" "}
          {commentsNbr} comments{" "}
        </p>
      </div>

      <div className="flex border-t-[1px] border-slate-200 px-6 pt-2">
        <button
          className="duraiton-300 flex w-1/2 items-center justify-center gap-2 rounded-md py-1.5 transition hover:bg-sky-100/50"
          onClick={() => {
            updatePostLikes(post_id, user._id);
          }}
        >
          {" "}
          <AiOutlineLike className="text-xl" />
          {isPending && (
            <span className="pt-1 font-medium text-slate-600">
              {" "}
              Updating Like ...{" "}
            </span>
          )}
          {!isPending && isPostLiked && (
            <span className="pt-1 font-medium text-slate-600"> Liked ! </span>
          )}
          {!isPending && !isPostLiked && (
            <span className="pt-1 font-medium text-slate-600"> Like </span>
          )}
        </button>
        {error && <Error error={error} />}

        <button
          className="duraiton-300 flex w-1/2 items-center justify-center gap-2 rounded-md py-1.5 transition hover:bg-sky-100/50"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          {" "}
          <FaRegComment className="text-xl" />
          <span className="font-medium text-slate-600">Comment </span>
        </button>
      </div>

      <PostCardComments
        user={user}
        post_id={post_id}
        showComments={showComments}
        setCommentsNbr={setCommentsNbr}
      />
    </section>
  );
};

export default PostCard;

import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { format } from "date-fns";
import defaultProfile from "../assets/images/defaultProfile.png";

const CommentCard = ({ author, content, likes, date }) => {
  const [formattedCommentDate, setFormattedCommentDate] = useState("");

  useEffect(() => {
    const formatDate = (date) => {
      const formattedDate = format(new Date(date), "PPP");
      return formattedDate;
    };

    setFormattedCommentDate(formatDate(date));
  }, []);
  return (
    <div className="flex items-center gap-3">
      {/* Author Image */}
      <div className="mb-4 h-10 w-10">
        <img
          src={author.profileImg.url ? author.profileImg.url : defaultProfile}
          className="object-fit h-full w-full rounded-full"
        />
      </div>

      {/* Card */}

      <div className="flex flex-col gap-2">
        {" "}
        <div className="flex flex-col gap-1 rounded bg-zinc-100/60 px-3 py-2">
          <div className="flex gap-6">
            <h1 className="font-semibold">
              {author.firstName} {author.lastName}
            </h1>
            <p className="text-sm text-black/60">{formattedCommentDate} </p>
          </div>

          <p> {content}</p>
        </div>
        {/* Like */}
        <div className="flex items-center justify-between text-sm font-medium text-black/50">
          <div className="flex gap-2 ">
            <span>Like</span>
            <div className="flex gap-1">
              <FcLike className="pt-0.5" />
              <span> {likes} </span>
            </div>
          </div>

          <div className="flex gap-2">
            <span>Edit</span>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

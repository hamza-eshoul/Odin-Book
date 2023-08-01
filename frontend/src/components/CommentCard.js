import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { format } from "date-fns";
import defaultProfile from "../images/defaultProfile.png";

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
    <div className="flex gap-3 items-center">
      {/* Author Image */}
      <div className="h-10 w-10 mb-4">
        <img
          src={author.profileImg.url ? author.profileImg.url : defaultProfile}
          className="h-full w-full rounded-full object-fit"
        />
      </div>

      {/* Card */}

      <div className="flex flex-col gap-2">
        {" "}
        <div className="bg-zinc-100/60 flex flex-col gap-1 rounded px-3 py-2">
          <div className="flex gap-6">
            <h1 className="font-semibold">
              {author.firstName} {author.lastName}
            </h1>
            <p className="text-sm text-black/60">{formattedCommentDate} </p>
          </div>

          <p> {content}</p>
        </div>
        {/* Like */}
        <div className="flex text-black/50 font-medium text-sm justify-between items-center">
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

import { BsThreeDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import odinBookLogo from "../images/odin-book.jpeg";
import { useEffect, useState } from "react";
import { getYear, format } from "date-fns";

const PostCard = ({ author, content, likes, date }) => {
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const formatDate = (date) => {
      const formattedDate =
        format(new Date(date), "LLLL") +
        " " +
        format(new Date(date), "co") +
        ", " +
        getYear(new Date(date));
      return formattedDate;
    };

    setFormattedDate(formatDate(date));
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-md py-2 px-6">
      {/* Header */}
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-3">
          <div className="flex justify-center items-center">
            <div className="h-12 w-12">
              <img
                src={odinBookLogo}
                className="h-full w-full rounded-full cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold cursor-pointer"> {author}</h3>
            <p className=" text-slate-600 "> {formattedDate}</p>
          </div>
        </div>

        <BsThreeDots className="text-xl cursor-pointer " />
      </div>

      {/* Body */}
      <div>{content}</div>

      {/* Likes and Comments Icons */}
      <div className="flex justify-between text-slate-600">
        <div className="flex items-center gap-2">
          <FcLike className="text-2xl " />
          <span> {likes} </span>
        </div>
        <p> 0 comments </p>
      </div>

      {/* Likes and Comments Buttons */}
      <div className="flex border-t-[1px] border-slate-200 pt-2">
        <button className="flex justify-center items-center gap-2 w-1/2 hover:bg-sky-100/50 transition duraiton-300 rounded-md py-1.5">
          {" "}
          <AiOutlineLike className="text-xl" />
          <span className="font-medium text-slate-600 pt-1">Like </span>
        </button>

        <button className="flex justify-center items-center gap-2 w-1/2 hover:bg-sky-100/50 transition duraiton-300 rounded-md py-1.5">
          {" "}
          <FaRegComment className="text-xl" />
          <span className="font-medium text-slate-600">Comment </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;

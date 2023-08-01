import React, { useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { RxCross1 } from "react-icons/rx";
import { RiFileAddFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { FcStackOfPhotos } from "react-icons/fc";
import { useAddPost } from "../hooks/useAddPost";
import { MoonLoader } from "react-spinners";
import { useAuthContext } from "../hooks/useAuthContext";

const AddPost = ({ setIsAddPostActive }) => {
  const [isAddPhotoActive, setIsAddPhotoActive] = useState(true);
  const [postContent, setPostContent] = useState("");
  const { addPost, error, isLoading } = useAddPost();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = user._id;

    await addPost(author, postContent);

    setIsAddPostActive(false);
  };

  return (
    <form
      className="flex flex-col w-[500px] rounded-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20 bg-white shadow-lg p-4 gap-4"
      onSubmit={handleSubmit}
    >
      {/* Add Post Header */}
      <header className="flex border-b-[1px] border-zinc-200 justify-center items-center pb-3">
        <h1 className="text-2xl font-semibold mx-auto"> Create Post </h1>
        <div
          className="bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setIsAddPostActive(false);
          }}
        >
          <RxCross1 className="text-zinc-600 text-xl" />
        </div>
      </header>
      {/* Profile Info */}
      <section className="flex gap-3 items-center">
        {/* profile Img */}
        <div className="h-12 w-12 ">
          {user && (
            <img
              src={user.profileImg.url ? user.profileImg.url : defaultProfile}
              alt="odin book logo"
              className="h-full w-full rounded-full "
            />
          )}
        </div>
        {/* Profile name */}
        <h2 className="font-semibold">
          {" "}
          {user.firstName} {user.lastName}
        </h2>
      </section>
      {/* Post Content */}
      <textarea
        value={postContent}
        onChange={(e) => {
          setPostContent(e.target.value);
        }}
        placeholder="What's on your mind ?"
        className="resize-none outline-none text-lg"
      />
      {/* Post Image */}
      {isAddPhotoActive && (
        <div className="border-[1px] border-zinc-300 rounded-lg h-[250px] p-2 relative">
          <div
            className="bg-white border-[1px] hover:bg-zinc-200  rounded-full p-2 flex justify-center items-center absolute right-[15px] top-[15px] cursor-pointer"
            onClick={() => {
              setIsAddPhotoActive(false);
            }}
          >
            <RxCross1 className="text-zinc-600 " />
          </div>{" "}
          <div className="h-full w-full bg-zinc-100/50 hover:bg-zinc-200/50 rounded cursor-pointer flex flex-col justify-center items-center">
            <div className="bg-zinc-200 rounded-full p-2 flex justify-center items-center cursor-pointer">
              <RiFileAddFill className="text-zinc-600 text-2xl" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-lg">Add photos and videos</p>
              <p className="text-sm text-gray-500/90">or drag and drop</p>
            </div>
          </div>
        </div>
      )}
      {/* Add to your post menu */}
      <div className="rounded-lg border-[1px] border-zinc-200 flex justify-between items-center p-3">
        <p className="font-semibold">Add to your post</p>
        <FcStackOfPhotos
          className="text-3xl mr-10 cursor-pointer"
          onClick={() => {
            setIsAddPhotoActive(true);
          }}
        />
        <BsThreeDots className="text-xl cursor-pointer" />
      </div>
      {/* Post Button */}{" "}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <MoonLoader
            color={"#3c82f6"}
            loading={isLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div
          className={`${postContent.length === 0 ? "cursor-not-allowed" : ""}`}
        >
          <button
            className={`${
              postContent.length === 0
                ? "bg-zinc-200 text-zinc-400/50 pointer-events-none "
                : "bg-blue-600 text-white hover:bg-blue-700/90"
            }  rounded  py-1 text-lg font-semibold  transition duration-300 w-full`}
          >
            {" "}
            Post
          </button>
        </div>
      )}
      {error && (
        <div className="text-red-500 font-semibold text-xl text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default AddPost;

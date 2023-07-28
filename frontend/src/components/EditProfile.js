import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdMode } from "react-icons/md";
import { useAddPost } from "../hooks/useAddPost";
import { MoonLoader } from "react-spinners";
import { useAuthContext } from "../hooks/useAuthContext";

const EditProfile = ({ setIsEditProfileActive }) => {
  const [isAddPhotoActive, setIsAddPhotoActive] = useState(true);
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { user, dispatch } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");
  const [editPersonelInformation, setEditPersonalInformation] = useState(false);
  const [editIntroInfo, setEditIntroInfo] = useState(false);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setOccupation(user.occupation);
    setEducation(user.education);
    setLocation(user.location);

    if (user.occupation) {
      setOccupation(user.occupation);
    }

    if (user.education) {
      setEducation(user.education);
    }

    if (user.location) {
      setLocation(user.location);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const user_id = user._id;

    const response = await fetch("http://localhost:4000/user/user_info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        firstName,
        lastName,
        email,
        occupation,
        education,
        location,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setIsEditProfileActive(false);
      dispatch({ type: "UPDATE_USER", payload: json });
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
  };

  return (
    <form
      className="flex flex-col w-[500px] rounded-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20 bg-white shadow-lg p-4 gap-4"
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <header className="flex border-b-[1px] border-zinc-200 justify-center items-center pb-3">
        <h1 className="text-2xl font-semibold mx-auto"> Edit Profile </h1>
        <div
          className="bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setIsEditProfileActive(false);
          }}
        >
          <RxCross1 className="text-zinc-600 text-xl" />
        </div>
      </header>
      {/* Edit Personal Information */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex justify-between items-center border-b-[1px] border-zinc-200 w-full ">
          {" "}
          <h1 className="text-2xl font-semibold text-blue-600 ">
            {" "}
            Personal Information{" "}
          </h1>
          <MdMode
            className="text-xl cursor-pointer hover:text-blue-700  "
            onClick={() => {
              setEditPersonalInformation(!editPersonelInformation);
            }}
          />
        </div>

        {editPersonelInformation ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              <label className="text-xl text-slate-800 ">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xl text-slate-800 ">Last name</label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xl text-slate-800 ">Email address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
              />
            </div>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            <li className="font-medium">
              {firstName} {lastName}
            </li>
            <li className="font-medium"> {email}</li>
          </ul>
        )}
      </section>
      {/* Customize Your Intro */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex justify-between items-center border-b-[1px] border-zinc-200 w-full ">
          {" "}
          <h1 className="text-2xl font-semibold text-blue-600 ">
            {" "}
            Customize Your Intro{" "}
          </h1>
          <MdMode
            className="text-xl cursor-pointer hover:text-blue-700"
            onClick={() => {
              setEditIntroInfo(!editIntroInfo);
            }}
          />
        </div>

        {editIntroInfo ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              <label className="text-xl text-slate-800 ">Occupation</label>
              <input
                type="text"
                onChange={(e) => setOccupation(e.target.value)}
                value={occupation}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xl text-slate-800 ">Education</label>
              <input
                type="text"
                onChange={(e) => setEducation(e.target.value)}
                value={education}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xl text-slate-800 ">Location</label>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
              />
            </div>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            <li className="font-medium">{occupation}</li>
            <li className="font-medium">{education}</li>
            <li className="font-medium">{location}</li>
          </ul>
        )}
      </section>
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
        <div className="flex justify-center items-center">
          <button className="bg-blue-600 text-white hover:bg-blue-700 rounded  py-1 text-lg font-semibold  transition duration-300 w-1/3">
            {" "}
            Save Changes
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

export default EditProfile;

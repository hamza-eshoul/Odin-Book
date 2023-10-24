import { useEffect, useState } from "react";
import { useUpdateUser } from "../hooks/useCRUD/useUpdateUser";

// icons
import { RxCross1 } from "react-icons/rx";
import { MdMode } from "react-icons/md";

// components
import Loading from "./Loading";
import Error from "./Error";

const UpdateProfileData = ({ profile, setProfile, setIsUpdateProfileData }) => {
  const [isUpdatePersonalData, setIsUpdatePersonalData] = useState(false);
  const [isUpdateIntroData, setIsUpdateIntroData] = useState(false);
  // profile data state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");

  const user_id = profile._id;

  const { updateUser, isPending, error } = useUpdateUser(
    `http://localhost:4000/users/${user_id}/profile_data`,
  );

  useEffect(() => {
    const initializeUserData = () => {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);

      if (profile.occupation) {
        setOccupation(profile.occupation);
      }

      if (profile.education) {
        setEducation(profile.education);
      }

      if (profile.location) {
        setLocation(profile.location);
      }
    };

    initializeUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated_user = await updateUser({
      firstName,
      lastName,
      email,
      occupation,
      education,
      location,
    });

    if (!error) {
      setProfile(updated_user);
      setIsUpdateProfileData(false);
    }
  };

  return (
    <form
      className="fixed left-1/2 top-1/2 z-20 flex max-h-[700px] w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-auto  rounded-lg bg-white p-2 shadow-lg sm:w-[480px] sm:p-4"
      onSubmit={handleSubmit}
    >
      <header className="flex items-center justify-center border-b-[1px] border-zinc-200 pb-3">
        <h3 className="mx-auto text-xl font-semibold sm:text-2xl">
          Edit Profile{" "}
        </h3>
        <div
          className="flex cursor-pointer items-center justify-center rounded-full bg-zinc-100 p-2 hover:bg-zinc-200"
          onClick={() => {
            setIsUpdateProfileData(false);
          }}
        >
          <RxCross1 className="text-zinc-600 sm:text-xl" />
        </div>
      </header>
      {/* Edit Personal Data */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex w-full items-center justify-between border-b-[1px] border-zinc-200 ">
          {" "}
          <h4 className="text-xl font-semibold text-mainBlue sm:text-2xl ">
            {" "}
            Personal Information{" "}
          </h4>
          <MdMode
            className="cursor-pointer hover:text-mainBlue sm:text-xl "
            onClick={() => {
              setIsUpdatePersonalData(!isUpdatePersonalData);
            }}
          />
        </div>

        {isUpdatePersonalData && (
          <div className="flex w-full flex-col gap-3 text-sm sm:text-base">
            <label className="form_label">
              <span className="text-slate-800"> First name </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-mainBlue sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800">Last name</span>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-mainBlue sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800 ">Email address</span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-mainBlue sm:px-3 sm:py-5"
              />
            </label>
          </div>
        )}

        {!isUpdatePersonalData && (
          <ul className="flex flex-col gap-3 text-sm sm:text-base">
            <li className="font-medium">
              {firstName} {lastName}
            </li>
            <li className="font-medium"> {email}</li>
          </ul>
        )}
      </section>

      {/* Customize Your Intro */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex w-full items-center justify-between border-b-[1px] border-zinc-200 ">
          {" "}
          <h4 className="text-xl font-semibold text-mainBlue sm:text-2xl ">
            {" "}
            Customize Your Intro{" "}
          </h4>
          <MdMode
            className="cursor-pointer hover:text-mainBlue sm:text-xl"
            onClick={() => {
              setIsUpdateIntroData(!isUpdateIntroData);
            }}
          />
        </div>

        {isUpdateIntroData && (
          <div className="flex w-full flex-col gap-3 text-sm sm:text-base">
            <label className="form_label">
              <span className="text-slate-800 ">Occupation</span>
              <input
                type="text"
                onChange={(e) => setOccupation(e.target.value)}
                value={occupation}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-mainBlue sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800 ">Education</span>
              <input
                type="text"
                onChange={(e) => setEducation(e.target.value)}
                value={education}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-mainBlue sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800">Location</span>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-mainBlue sm:px-3 sm:py-5"
              />
            </label>
          </div>
        )}
        {!isUpdateIntroData && (
          <ul className="flex flex-col gap-3 text-sm sm:text-base">
            <li className="font-medium">{occupation}</li>
            <li className="font-medium">{education}</li>
            <li className="font-medium">{location}</li>
          </ul>
        )}
      </section>
      {/* Post Button */}
      {isPending && <Loading loadingColor={"white"} />}
      {error && <Error error={error} />}
      {!isPending && !error && (
        <footer className="flex items-center justify-center">
          <button className="flex items-center justify-center rounded bg-mainBlue px-1.5 py-2 text-sm font-semibold text-white sm:px-4 sm:text-base">
            {" "}
            Save Changes
          </button>
        </footer>
      )}
    </form>
  );
};

export default UpdateProfileData;

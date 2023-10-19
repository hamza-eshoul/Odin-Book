import React, { useEffect, useState } from "react";
import { BsFillClockFill, BsFillBriefcaseFill } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const AboutProfile = ({ currentUser }) => {
  const [occupation, setOccupation] = useState(null);
  const [education, setEducation] = useState(null);
  const [location, setLocation] = useState(null);
  const [creationDate, setCreationDate] = useState(null);
  const { user } = useAuthContext();

  const page_location = useLocation();

  useEffect(() => {
    if (user && user._id == page_location.pathname.split("/")[2]) {
      setOccupation(user.occupation);
      setEducation(user.education);
      setLocation(user.location);
      setCreationDate(format(new Date(user.createdAt), "PPP"));
    } else if (currentUser) {
      if (currentUser.occupation) {
        setOccupation(currentUser.occupation);
      }
      if (currentUser.education) {
        setEducation(currentUser.education);
      }
      if (currentUser.location) {
        setLocation(currentUser.location);
      }
      if (currentUser.createdAt) {
        setCreationDate(format(new Date(currentUser.createdAt), "PPP"));
      }
    }
  }, [currentUser, user]);

  return (
    <ul className="space-y-3.5">
      {occupation && (
        <li className="flex items-center gap-3">
          <BsFillBriefcaseFill className="text-lg text-zinc-400" />
          <span className="text-[15px] font-semibold"> {occupation}</span>
        </li>
      )}

      {education && (
        <li className="flex items-center gap-3">
          <FaUserGraduate className="text-lg text-zinc-400" />
          <div>
            Studied at{" "}
            <span className="text-[15px] font-semibold">{education}</span>
          </div>
        </li>
      )}

      {location && (
        <li className="flex items-center gap-3">
          <ImHome className="text-lg text-zinc-400" />
          <div>
            Lives in{" "}
            <span className="text-[15px] font-semibold">{location}</span>
          </div>
        </li>
      )}

      {creationDate && (
        <li className="flex items-center gap-3">
          <BsFillClockFill className="text-lg text-zinc-400" />

          <div>
            Member since{" "}
            <span className="text-[15px] font-semibold">{creationDate}</span>
          </div>
        </li>
      )}
    </ul>
  );
};

export default AboutProfile;

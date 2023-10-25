import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth/useLogout";

// components
import Toast from "../components/Toast";

const NavMenu = ({ user, setIsNavMenu }) => {
  const [toastNotification, setToastNotification] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleToastNotification = () => {
    setToastNotification(true);

    setTimeout(() => {
      setToastNotification(null);
    }, 5000);
  };

  const dynamicallyNavigateToProfile = () => {
    const path = location.pathname.split("/")[1];

    if (path === "profile") {
      navigate(`/profile/${user._id}/`);
      window.location.reload();
    } else {
      navigate(`/profile/${user._id}/`);
    }
  };
  return (
    <ul className="xsm:top-14 xsm:text-base absolute right-3.5 top-[68px] flex w-32 flex-col rounded-md border-[0.5px] bg-white p-1.5 text-sm shadow-sm">
      {" "}
      <li
        className="cursor-pointer border-b-[1px] px-1 py-1.5 transition duration-300 hover:bg-[#f8fafd] sm:px-2.5"
        onClick={() => {
          dynamicallyNavigateToProfile();
          setIsNavMenu(false);
        }}
      >
        {" "}
        View Profile
      </li>
      <li
        className="cursor-pointer border-b-[1px] px-1 py-1.5 transition duration-300 hover:bg-[#f8fafd] sm:px-2.5"
        onClick={toggleToastNotification}
      >
        {" "}
        Settings
      </li>
      <Link
        to="/login"
        onClick={() => {
          logout();
          setIsNavMenu(false);
        }}
      >
        <li className="cursor-pointer px-1 py-1.5 transition  duration-300 hover:bg-[#f8fafd] sm:px-2.5">
          {" "}
          Log out
        </li>
      </Link>
      {toastNotification && (
        <Toast
          elementType={"Button"}
          bgColor={"bg-mainBlue"}
          textColor={"text-white"}
          toastNotification={toastNotification}
          setToastNotification={setToastNotification}
        />
      )}
    </ul>
  );
};

export default NavMenu;

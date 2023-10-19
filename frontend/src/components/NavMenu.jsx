import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const NavMenu = ({ user }) => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

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
    <ul className="absolute right-3.5 top-14 flex w-32 flex-col rounded-md border-[0.5px] bg-white p-1.5 shadow-sm">
      {" "}
      <li
        className="cursor-pointer border-b-[1px] px-2.5 py-1.5 transition duration-300 hover:bg-[#f8fafd]"
        onClick={() => {
          dynamicallyNavigateToProfile();
        }}
      >
        {" "}
        View Profile
      </li>
      <li className="cursor-pointer border-b-[1px] px-2.5 py-1.5 transition duration-300 hover:bg-[#f8fafd]">
        {" "}
        Settings
      </li>
      <Link to="/login" onClick={logout}>
        <li className="cursor-pointer px-2.5 py-1.5  transition duration-300 hover:bg-[#f8fafd]">
          {" "}
          Log out
        </li>
      </Link>
    </ul>
  );
};

export default NavMenu;

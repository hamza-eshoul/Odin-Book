import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useFetchAllUsers } from "../hooks/useFetchAllUsers";
import defaultProfile from "../assets/images/defaultProfile.png";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const Search = () => {
  const [queryText, setQueryText] = useState("");
  const [filteredArray, setFilteredArray] = useState(null);
  const { usersList, isPending, error } = useFetchAllUsers();

  useEffect(() => {
    if (usersList) {
      setFilteredArray(
        usersList.filter(
          (user) =>
            user.firstName.toUpperCase().includes(queryText.toUpperCase()) ||
            user.lastName.toUpperCase().includes(queryText.toUpperCase()),
        ),
      );
    }
  }, [usersList, queryText]);

  return (
    <div className="relative">
      <HiMagnifyingGlass className="absolute left-2 top-[11px] text-lg text-zinc-500" />
      <input
        type="search"
        placeholder="Search"
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
        className="w-full rounded bg-zinc-100 p-2 pl-8 outline-none"
      />

      {queryText !== "" && (
        <ul className="absolute top-4 z-20 flex max-h-[600px] w-full translate-y-10 flex-col overflow-auto bg-white">
          {filteredArray.map((user) => (
            <li>
              <Link reloadDocument to={`/profile/${user._id}`}>
                <div className="flex items-center justify-between px-2 pr-5 hover:bg-zinc-100/50">
                  <div className="flex h-[70px] cursor-pointer items-center gap-2">
                    {/* Profile Img */}
                    <div className="w-18 h-11 pl-6">
                      <img
                        src={
                          user.profileImg.url
                            ? user.profileImg.url
                            : defaultProfile
                        }
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {" "}
                        {user.firstName} {user.lastName}{" "}
                      </p>
                      <p className="text-sm text-[#737373]">
                        {" "}
                        {user.firstName} {user.lastName}{" "}
                      </p>
                    </div>
                  </div>{" "}
                  <BiSearchAlt className="text-2xl" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;

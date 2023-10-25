// components
import Search from "../../components/Search";
import LatestPost from "../../components/LatestPost";
import SuggestedFriends from "../../components/SuggestedFriends";
import HomepageAsideCard from "./HomepageAsideCard";

const HomepageRightAside = () => {
  return (
    <aside className="hidden w-[35%] flex-col items-center gap-6 xmd:flex lg:w-[30%]">
      <HomepageAsideCard title={"Find Your Friends"}>
        <Search />
      </HomepageAsideCard>

      <HomepageAsideCard title={"Suggested Friends"}>
        <SuggestedFriends />
      </HomepageAsideCard>

      <LatestPost />
    </aside>
  );
};

export default HomepageRightAside;

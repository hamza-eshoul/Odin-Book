// components
import Search from "../../components/Search";
import LatestPost from "../../components/LatestPost";
import SuggestedFriends from "../../components/SuggestedFriends";
import HomepageAsideCard from "./HomepageAsideCard";

const HomepageRightAside = () => {
  return (
    <section className="flex w-[30%] flex-col items-center gap-6">
      <HomepageAsideCard title={"Find Your Friends"}>
        <Search />
      </HomepageAsideCard>

      <HomepageAsideCard title={"Suggested Friends"}>
        <SuggestedFriends />
      </HomepageAsideCard>

      <LatestPost />
    </section>
  );
};

export default HomepageRightAside;

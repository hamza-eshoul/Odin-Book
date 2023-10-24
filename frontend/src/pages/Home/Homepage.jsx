import { usePostContext } from "../../hooks/useContext/usePostContext";

// components
import AddPost from "../../components/AddPost";
import Overlay from "../../components/Overlay";
import HomepageRightAside from "./HomepageRightAside";
import HomepageLeftAside from "./HomepageLeftAside";
import HomepageBody from "./HomepageBody";

const Homepage = () => {
  const { isAddPost } = usePostContext();
  return (
    <main className="mx-auto flex w-[75%] gap-6 bg-[#fbfcfe] py-24">
      {isAddPost && (
        <>
          <Overlay />
          <AddPost />
        </>
      )}

      <HomepageLeftAside />

      <HomepageBody />

      <HomepageRightAside />
    </main>
  );
};

export default Homepage;

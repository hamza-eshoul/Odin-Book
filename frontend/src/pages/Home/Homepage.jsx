// components
import HomepageRightAside from "./HomepageRightAside";
import HomepageLeftAside from "./HomepageLeftAside";
import HomepageBody from "./HomepageBody";

const Homepage = () => {
  return (
    <main className="mx-auto flex max-w-7xl gap-6 bg-[#fbfcfe] px-4 py-24">
      <HomepageLeftAside />

      <HomepageBody />

      <HomepageRightAside />
    </main>
  );
};

export default Homepage;

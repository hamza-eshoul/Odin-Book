import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostContext } from "../../hooks/usePostContext";
import { useFetchRecentPosts } from "../../hooks/useFetchRecentPosts";

// icons
import { MdAddCircle } from "react-icons/md";

// components
import AddPost from "../../components/AddPost";
import Overlay from "../../components/Overlay";
import HomepageRightAside from "./HomepageRightAside";
import HomepageLeftAside from "./HomepageLeftAside";
import PostCard from "../../components/PostCard";

const Homepage = ({ isAddPostActive, setIsAddPostActive }) => {
  const [pageLoading, setPageLoading] = useState(null);
  const { recentPosts, isPending, error } = useFetchRecentPosts();
  const { user } = useAuthContext();
  const { dispatch, posts } = usePostContext();

  // useEffect(() => {
  //   const user_id = user._id;
  //   const user_friends_ids = user.friends_ids;

  //   const user_and_friends_ids = user_friends_ids.concat(user_id);

  //   const fetchRecentPosts = async () => {
  //     dispatch({ type: "SET_POSTS", payload: [" ", " ", " ", " ", " "] });
  //     setPageLoading(true);
  //     const response = await fetch("http://localhost:4000/post/recent_posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ user_and_friends_ids }),
  //     });

  //     const json = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: "SET_POSTS", payload: json });
  //       setPageLoading(null);
  //     }
  //   };

  //   fetchRecentPosts();
  // }, []);

  return (
    <div className="bg-[#fbfcfe]">
      <main className="mx-auto flex w-[75%] gap-6 py-24">
        {isAddPostActive && (
          <>
            <Overlay />
            <AddPost setIsAddPostActive={setIsAddPostActive} />
          </>
        )}

        <HomepageLeftAside />

        <section className="flex w-[40%] flex-col gap-3">
          <div
            className="flex cursor-pointer items-center gap-4 rounded-md border-[1px] border-zinc-200 bg-white py-3 pl-6 transition duration-300 hover:bg-[#f8fafd]"
            onClick={() => {
              setIsAddPostActive(true);
            }}
          >
            <MdAddCircle className="text-3xl text-blue-600" />
            <div className="flex flex-col">
              <h3 className="text-lg font-medium"> Create Post</h3>
              <p className="font-light text-zinc-600">
                {" "}
                Share everyday moments with friends and family
              </p>
            </div>
          </div>

          {pageLoading ? (
            <>
              {/* {recentPosts &&
                recentPosts.map((post) => (
                  <PostCard key={post._id} isPostLoading={true} />
                ))}{" "} */}
            </>
          ) : (
            <>
              {" "}
              {recentPosts &&
                recentPosts.map((post) => (
                  <p> {post.author}</p>
                  // <PostCard
                  //   key={post._id}
                  //   author={post.author}
                  //   content={post.content}
                  //   image={post.postImage.url ?? null}
                  //   date={post.createdAt}
                  //   post_id={post._id}
                  // />
                ))}{" "}
            </>
          )}
        </section>

        {/* <HomepageRightAside /> */}
      </main>
    </div>
  );
};

export default Homepage;

import { useFetchRecentPosts } from "../../hooks/useFetch/useFetchRecentPosts";
import { usePostContext } from "../../hooks/useContext/usePostContext";

// components
import PostCard from "../../components/PostCard";
import AddPostCard from "../../components/AddPostCard";
import Error from "../../components/Error";

const pending_posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const HomepageBody = () => {
  const { isPending, error } = useFetchRecentPosts();
  const { posts } = usePostContext();

  return (
    <section className="xmd:w-[65%] mx-auto flex w-full flex-col gap-3 sm:w-[80%] lg:w-[40%]">
      <AddPostCard />
      {isPending &&
        pending_posts.map((pending_post) => (
          <PostCard key={pending_post.id} isPostLoading={true} />
        ))}{" "}
      {!isPending &&
        posts &&
        posts.map((post) => (
          <PostCard
            key={post._id}
            author={post.author}
            content={post.content}
            image={post.postImage.url ?? null}
            date={post.createdAt}
            post_id={post._id}
          />
        ))}{" "}
      {error && (
        <Error
          error={error}
          errorSize={"text-lg"}
          errorColor={"text-mainBlue"}
        />
      )}
    </section>
  );
};

export default HomepageBody;

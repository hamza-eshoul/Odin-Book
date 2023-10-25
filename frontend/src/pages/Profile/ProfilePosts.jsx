import { useFetchProfilePosts } from "../../hooks/useFetch/useFetchProfilePosts";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { usePostContext } from "../../hooks/useContext/usePostContext";

// components
import PostCard from "../../components/PostCard";
import AddPostCard from "../../components/AddPostCard";
import Error from "../../components/Error";

const pending_profile_posts = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const ProfilePosts = ({ profile_id }) => {
  const { isPending, error } = useFetchProfilePosts(profile_id);
  const { user } = useAuthContext();
  const { posts } = usePostContext();

  return (
    <section className="mt-6 flex w-full flex-col gap-4 xmd:w-2/3">
      <header className="rounded-md border-[1px] border-zinc-200 bg-white px-6 py-2.5 shadow-sm">
        <h2 className="text-2xl font-semibold"> Posts </h2>
      </header>
      {user._id == profile_id && <AddPostCard />}
      {isPending &&
        pending_profile_posts.map((pending_post) => (
          <PostCard key={pending_post.id} isPostLoading={true} />
        ))}{" "}
      {!isPending &&
        posts &&
        posts.length !== 0 &&
        posts.map((post) => (
          <PostCard
            key={post._id}
            author={post.author}
            content={post.content}
            image={post.postImage.url ?? null}
            date={post.createdAt}
            post_id={post._id}
          />
        ))}
      {!isPending && posts && posts.length == 0 && (
        <div className="flex justify-center gap-4 rounded-md bg-white p-4  ">
          <h3 className="text-xl font-medium ">
            {" "}
            There currently are not posts ...
          </h3>
        </div>
      )}
      {error && <Error error={error} />}
    </section>
  );
};

export default ProfilePosts;

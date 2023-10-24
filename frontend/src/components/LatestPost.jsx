import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchRecentPosts } from "../hooks/useFetch/useFetchRecentPosts";
import { usePostContext } from "../hooks/useContext/usePostContext";

// components
import HomepageAsideCard from "../pages/Home/HomepageAsideCard";
import Loading from "./Loading";
import Error from "./Error";

const LatestPost = () => {
  const { isPending, error } = useFetchRecentPosts();
  const [latestPost, setLatestPost] = useState(null);
  const { posts } = usePostContext();

  useEffect(() => {
    if (posts) {
      setLatestPost(posts[0]);
    }
  }, [posts]);

  return (
    <HomepageAsideCard title={"Latest Published Post"}>
      {isPending && <Loading loadingColor={"gray"} />}
      {error && (
        <Error
          error={error}
          errorSize={"text-lg"}
          errorColor={"text-mainBlue"}
        />
      )}
      {!isPending && latestPost && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src={latestPost.author.profileImg.url}
              className="h-12 w-12 rounded-full"
              alt="profile"
            />
            <Link
              className="cursor-pointer font-medium hover:underline"
              to={`/profile/${latestPost.author._id}/`}
            >
              {latestPost.author.firstName} {latestPost.author.lastName}
            </Link>
          </div>

          <p>
            {latestPost.content.length > 40
              ? latestPost.content.substring(0, 40) + "..."
              : latestPost.content}
          </p>

          {latestPost.postImage.url && (
            <div className="h-[220px] w-full">
              <img
                src={latestPost.postImage.url}
                className="h-full w-full rounded"
                alt="post"
              />
            </div>
          )}
        </div>
      )}
    </HomepageAsideCard>
  );
};

export default LatestPost;

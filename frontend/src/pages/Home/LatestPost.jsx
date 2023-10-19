import { useState, useEffect } from "react";
import { useFetchRecentPosts } from "../../hooks/useFetchRecentPosts";
import HomepageAsideCard from "./HomepageAsideCard";

const LatestPost = () => {
  const { recentPosts, isPending, error } = useFetchRecentPosts();
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    if (recentPosts) {
      setLatestPost(recentPosts[0]);
      console.log(latestPost);
    }
  }, [recentPosts]);

  return (
    <HomepageAsideCard title={"Latest Published Post"}>
      {latestPost && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src={latestPost.author.profileImg.url}
              className="h-12 w-12 rounded-full"
            />
            <p className="font-medium">
              {latestPost.author.firstName} {latestPost.author.lastName}
            </p>
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
              />
            </div>
          )}
        </div>
      )}
    </HomepageAsideCard>
  );
};

export default LatestPost;

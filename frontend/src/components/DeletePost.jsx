import { useDeletePost } from "../hooks/useCRUD/useDeletePost";

// components
import Loading from "./Loading";
import Error from "./Error";

const DeletePost = ({ setIsDeletePost, post_id }) => {
  const { deletePost, isPending, error } = useDeletePost();
  return (
    <ul className="absolute right-12 top-6 flex flex-col rounded-md bg-white p-1 text-center shadow">
      <li
        className="cursor-pointer border-b-[1px] border-zinc-200 px-6 py-1.5 font-medium text-red-500 hover:opacity-70"
        onClick={() => deletePost(post_id)}
      >
        {isPending && <Loading loadingSize={20} loadingColor={"red"} />}
        {!isPending && <span> Delete Post </span>}
      </li>
      {error && <Error error={error} />}
      <li
        className="cursor-pointer px-6 py-1.5 font-medium hover:opacity-70"
        onClick={() => setIsDeletePost(false)}
      >
        Cancel
      </li>
    </ul>
  );
};

export default DeletePost;

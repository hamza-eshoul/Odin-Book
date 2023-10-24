import { usePostContext } from "../hooks/useContext/usePostContext";
// icons
import { MdAddCircle } from "react-icons/md";

const AddPostCard = () => {
  const { dispatch } = usePostContext();
  return (
    <div
      className="flex cursor-pointer items-center gap-4 rounded-md border-[1px] border-zinc-200 bg-white py-3 pl-6 transition duration-300 hover:bg-[#f8fafd]"
      onClick={() => {
        dispatch({ type: "ADD_POST" });
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
  );
};

export default AddPostCard;

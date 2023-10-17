import { ClipLoader } from "react-spinners";

const Loading = ({ loadingColor, loadingSize, loadingHeight }) => {
  return (
    <div
      className={`flex ${loadingHeight} w-full items-center justify-center `}
    >
      <ClipLoader color={loadingColor} size={loadingSize} />
    </div>
  );
};

export default Loading;

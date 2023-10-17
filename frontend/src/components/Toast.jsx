import { AiOutlineInfoCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Toast = ({
  bgColor,
  textColor,
  elementType,
  toastNotification,
  setToastNotification,
}) => {
  return (
    <>
      {toastNotification && (
        <div
          className={`fixed bottom-4 left-[50%] mx-auto flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 ${bgColor} ${textColor} border-primaryGray z-10 rounded-lg border-[1px] to-zinc-100 p-4 text-base shadow-2xl`}
        >
          <AiOutlineInfoCircle className="hidden text-xl md:block" />
          <div>
            <h2 className="hidden font-semibold md:block">
              {" "}
              {elementType.charAt(0).toUpperCase() + elementType.slice(1)}{" "}
              Notification
            </h2>
            <p>This {elementType} is used for decoration purposes only </p>
          </div>
          <RxCross1
            className="hidden cursor-pointer text-lg sm:block"
            onClick={() => setToastNotification(null)}
          />
        </div>
      )}
    </>
  );
};

export default Toast;

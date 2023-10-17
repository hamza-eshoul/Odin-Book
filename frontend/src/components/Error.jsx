const Error = ({ error, errorHeight, errorColor, errorSize }) => {
  return (
    <div className={`flex ${errorHeight} w-full items-center justify-center `}>
      <p className={`text-center ${errorSize} font-bold ${errorColor}`}>
        {" "}
        Error : {error}{" "}
      </p>
    </div>
  );
};

Error.defaultProps = {
  errorColor: "text-red-600",
  errorSize: "text-xl",
};

export default Error;

import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-1 text-lg mb-10">
      <div className="flex gap-2">
        <FaGithub className="text-2xl" />
        <p className="text-blue-600 font-semibold text-xl"> Odin Book</p>
      </div>
      <p> © Hamza Eshoul 2023 </p>
    </footer>
  );
};

export default Footer;

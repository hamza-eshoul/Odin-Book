import React, { useState } from "react";
import odinBookLogo from "../images/odin-book.jpeg";
import Footer from "../components/Footer";
import { FaFacebookSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { MoonLoader } from "react-spinners";
import { useLoginDemoAccount } from "../hooks/useLoginDemoAccount";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { loginDemoAccount, demoError, isDemoLoading } = useLoginDemoAccount();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto h-screen">
      <div className="h-full flex items-center justify-between gap-12">
        {/* Odin Book */}
        <section className="flex gap-7 justify-center items-center">
          {/* odin book logo */}
          <div className="w-[180px] h-[160px] object-fit ">
            <img
              src={odinBookLogo}
              alt="odin book logo"
              className="h-full w-full rounded-lg"
            />
          </div>

          {/* odin book text */}
          <p className="text-blue-700 text-4xl font-bold"> Odin Book</p>
        </section>

        {/* spacer */}
        <span className="h-1/2 border-[0.1px] border-blue-500" />

        {/* Log in */}
        <form className="flex flex-col gap-5 w-[40%]" onSubmit={handleSubmit}>
          <h1 className="text-5xl text-slate-900 font-bold text-center">
            {" "}
            Log in
          </h1>

          <div className="flex flex-col gap-3">
            <label className="text-xl text-slate-800 ">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xl text-slate-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <MoonLoader
                color={"#3c82f6"}
                loading={isLoading}
                size={45}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white rounded  py-2 text-xl font-semibold hover:bg-blue-500 transition duration-300 "
            >
              {" "}
              Log in
            </button>
          )}

          <button className="flex justify-center items-center bg-white gap-2 border-[1px] border-blue-600 text-zinc-700 font-semibold hover:bg-blue-50/60 transition duration-300 rounded py-2">
            {" "}
            <FaFacebookSquare className="text-3xl text-blue-600" />
            <span className="text-xl">Log in with Facebook</span>{" "}
          </button>

          <div className="mt-10 flex flex-col gap-4 w-full items-center">
            <Link
              to="/signup"
              className="bg-blue-600 text-white rounded  py-2 text-lg font-semibold hover:bg-blue-500 transition duration-300 w-1/2 text-center"
            >
              Create a new account
            </Link>

            <button
              type="button"
              className="flex justify-center items-center bg-white gap-2 border-[1px] border-blue-600 text-zinc-700 font-semibold hover:bg-blue-50/60 transition duration-300 rounded py-2 w-1/2"
              onClick={loginDemoAccount}
            >
              {" "}
              <CgProfile className="text-3xl text-blue-600" />
              {isDemoLoading ? (
                <span className="text-lg"> Loggng in ... </span>
              ) : (
                <span className="text-lg">Try a demo account</span>
              )}
            </button>
          </div>
          {error && (
            <div className="text-red-500 font-semibold text-xl text-center">
              {error}
            </div>
          )}

          {demoError && (
            <div className="text-red-500 font-semibold text-xl text-center">
              {demoError}
            </div>
          )}
        </form>
      </div>

      {/* Login footer */}
      <Footer />
    </div>
  );
};

export default Login;

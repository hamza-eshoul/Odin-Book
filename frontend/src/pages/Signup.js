import React, { useState } from "react";
import odinBookLogo from "../images/odin-book.jpeg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { MoonLoader } from "react-spinners";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(firstName, lastName, email, password, confirmPassword);
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

        {/* Sign up */}
        <form className="flex flex-col gap-5 w-[40%] " onSubmit={handleSubmit}>
          <h1 className="text-5xl text-slate-900 font-bold text-center">
            {" "}
            Sign up
          </h1>
          <div className="flex flex-col gap-3">
            <label className="text-xl text-slate-800 ">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-xl text-slate-800 ">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-xl text-slate-800 ">Email address</label>
            <input
              type="text"
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

          {password.length > 0 && (
            <div className="flex flex-col gap-3">
              <label className="text-xl text-slate-800">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-blue-700 text-xl"
              />
            </div>
          )}

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
            <div className="space-y-5">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded  py-2 text-xl font-semibold hover:bg-blue-500 transition duration-300 w-full"
              >
                {" "}
                Create Account
              </button>

              <div className="flex w-full justify-center">
                <button className="flex justify-center items-center bg-white gap-2 border-[1px] border-blue-600 text-zinc-700 font-semibold hover:bg-blue-50/60 transition duration-300 rounded py-2 w-1/2">
                  {" "}
                  <Link to="/login" className="text-lg">
                    Already Have an Account ?
                  </Link>{" "}
                </button>{" "}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-500 font-semibold text-xl text-center">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Login footer */}
      <Footer />
    </div>
  );
};

export default Signup;

import React from "react";
import logo from "../../images/odin-book.png";

const Login2 = () => {
  return (
    <div className="flex">
      <section className="flex flex-col">
        <img src={logo} className="h-24 w-24" />

        <h1 className="text-xl font-semibold">Login</h1>
        <h2 className="text-sm text-zinc-500">To meet the world. </h2>

        <form>
          <label className="auth_label">
            <span className="auth_label_text">Email address</span>
            <input type="email" className="auth_input" />
          </label>
          <label className="auth_label">
            <span className="auth_label_text">Password</span>
            <input type="password" className="auth_input" />
          </label>
          <button>Login</button>
          <button type="button">Try a demo account</button>
        </form>
      </section>
      <img />
    </div>
  );
};

export default Login2;

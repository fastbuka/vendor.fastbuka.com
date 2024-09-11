import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "../../public/images/Section.png";
import login from "../../public/images/login.png";

export default function Login() {
  return (
    <div>
      <div className="bg-[]"></div>
      <Image alt="" src={Section} className="img-fluid hidden md:block" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5">
        <div className="md:ms-32 ms-10 order-last md:order-1">
          <h1 className="text-4xl font-bold tracking-wider">Welcome Back!</h1>
          <p className="text-lg tracking-wide">Enter Login Details Below</p>
          <div className="login-form mt-5">
            <form className="">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex items-start mb-1">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-black rounded bg-auto"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 block mb-2 text-md font-medium text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Login
              </button>
              <p className="mt-3 tracking-wider">
                Don't Have an Account{" "}
                <span className="font-bold">
                  <Link href="">Create Account?</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="order-2 ">
          <Image src={login} alt="" className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5" />
        </div>
      </div>
      <footer>
        <p className="text-center text-xl font-mono font-bold my-10">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
    </div>
  );
}

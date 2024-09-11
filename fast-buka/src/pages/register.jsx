import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "../../public/images/Section.png";
import login from "../../public/images/login.png";

export default function Register() {
  return (
    <div>
      <div>
        <Image alt="" src={Section} className="img-fluid hidden md:block" />
        <Image
          alt=""
          src={login}
          className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5 block md:hidden"
        />
        <h1 className="text-4xl font-bold md:tracking-wider md:text-center ms-3 mt-5">
          Let's Get to know you!
        </h1>
        <p className="text-lg md:tracking-wide md:text-center ms-3">
          We'll help you set up an account in less than a minute
        </p>
        <form action="" className="container mx-auto md:w-3/4 px-5 ">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 mt-5">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Full Name"
                required
              />
            </div>
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
                name="email"
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="city"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <select
                  id="city"
                  name="city"
                  autoComplete="city-name"
                  className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                >
                  <option value="Delta">Delta</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Phone Number"
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
                name="password"
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
          >
            Register
          </button>
        </form>
      </div>
      <footer>
        <p className="text-center text-xl font-mono font-bold my-10">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
    </div>
  );
}

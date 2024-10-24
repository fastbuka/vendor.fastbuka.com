"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import login from "/public/login.png";
import Section from "/public/Section.png";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface Errors {
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  phone_number?: string[];
  password?: string[];
  password_confirmation?: string[];
}

const Page: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [first_name, setUserFirstName] = useState<string>("");
  const [last_name, setUserLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    // register({
    //   first_name,
    //   last_name,
    //   email,
    //   password,
    //   password_confirmation: passwordConfirmation,
    //   remember,
    //   setErrors,
    //   setStatus,
    // });
  };

  return (
    <div>
      <div>
        <Image alt="" src={Section} className="img-fluid md:block" />
        <h1 className="text-4xl font-bold md:tracking-wider md:text-center ms-3 mt-5">
          Let&apos;s Get to know you!
        </h1>
        <p className="text-lg md:tracking-wide md:text-center ms-3">
          We&apos;ll help you set up an account in less than a minute
        </p>
        <form
          onSubmit={submitForm}
          className="container mx-auto md:w-3/4 px-5 "
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 mt-5">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={first_name}
                onChange={(event) => setUserFirstName(event.target?.value)}
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={last_name}
                onChange={(event) => setUserLastName(event.target?.value)}
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
                value={email}
                onChange={(event) => setEmail(event.target?.value)}
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
                  value={city}
                  onChange={(event) => setCity(event.target?.value)}
                  autoComplete="city-name"
                  className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                >
                  <option value="">Choose your City</option>
                  <option value="Asaba">Asaba</option>
                  <option value="Warri">Warri</option>
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
                value={phone}
                onChange={(event) => setPhone(event.target?.value)}
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
              >
                Password
                <button type="button" onClick={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <BiShowAlt size="26px" />
                  ) : (
                    <BiHide size="26px" />
                  )}
                </button>
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target?.value)}
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
              >
                Confirm Password
                <button type="button" onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordVisible ? (
                    <BiShowAlt size="26px" />
                  ) : (
                    <BiHide size="26px" />
                  )}
                </button>
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmpassword"
                name="confirmpassword"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target?.value)
                }
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-[#3ab764] border border-[#3ab764] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#3ab764] duration-300 hover:drop-shadow-2xl"
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
};

export default Page;

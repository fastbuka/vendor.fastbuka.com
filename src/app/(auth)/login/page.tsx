"use client";

import { FormEvent, useState, ChangeEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";
import Section from "../../../../public/Section.png";
import LoginImg from "../../../../public/login.png";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

interface Errors {
  email?: string[];
  password?: string[];
}

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [shouldRemember, setShouldRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState({});

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

  return (
    <div>
      <div className="bg-[]"></div>
      <Image
        alt="section"
        src={Section}
        className="img-fluid hidden md:block"
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5">
        <div className="md:ms-32 mx-5 order-last md:order-1">
          <h1 className="text-4xl font-bold tracking-wider">Welcome Back!</h1>
          <p className="text-lg tracking-wide">Enter Login Details Below</p>
          <div className="login-form mt-5">
            <form onSubmit={submitForm} className="">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
                >
                  Password
                </label>
                <div className="flex bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-2 placeholder-gray-500">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Password"
                    required
                  />
                  <button type="button" onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <BiShowAlt size="26px"/>
                    ) : (
                      <BiHide size="26px"/>
                    )}
                  </button>
                </div>
              </div>
              <Link
                href="/auth/reset_password"
                className="flex justify-end w-full items-start mb-1 text-blue-600 font-bold"
              >
                <p>Forgot password?</p>
              </Link>
              <button
                type="submit"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Login
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <p className="mt-3 tracking-wider">
                Don&apos;t Have an Account
                <span className="font-bold">
                  <Link href="/register"> Create Account?</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="order-2 ">
          <Image
            src={LoginImg}
            alt="login"
            className="img-fluid hidden md:block p-5 transition ease-in-out delay-150 hover:-translate-y-5"
          />
        </div>
      </div>
      <footer>
        <p className="text-center text-xl font-mono font-bold my-10">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Login;

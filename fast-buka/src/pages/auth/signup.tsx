import React, { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Section from "../../../public/images/homepage/Section.png";
import login from "../../../public/images/homepage/login.png";
import { sendOTPtoMail, verifyOTP } from "@/lib/api";
import { Eye } from "lucide-react";
// import Register from "../../../prisma/Mutation/Registration"

export default function Signup() {
  const [enterMail, setEntermail] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [viewVer, setViewVer] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [register, setRegister] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const router = useRouter();

  const handleOTPChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOTP = [...OTP];
      newOTP[index] = value;

      setOTP((prevOTP) => {
        const updatedOTP = [...prevOTP];
        updatedOTP[index] = value;
        return updatedOTP;
      });

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleVerifyEmail = async () => {
    try {
      await sendOTPtoMail(email);
      console.log("email: ", email);
      setViewVer(true);
    } catch (error) {
      console.error("failed to verify email: ", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Data = {
      name,
      email,
      phone,
      city,
      password,
    };
    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      if (response.ok) {
        const result = await response.json();
        router.push("/auth/login");
      } else {
        const error = await response.json();
        console.error("Registration error:", error);
      }
    } catch (error) {
      console.error("failed to submit form: ", error);
    }

    console.log("data: ", name, email, city, password);
  };

  useEffect(() => {
    const fullOTP = OTP.join("");
    if (fullOTP.length === 4 && OTP.every((digit) => digit !== "")) {
      handleSubmitOTP();
    }
  }, [OTP]);

  const handleSubmitOTP = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    const fullOTP = OTP.join("");
    console.log("full OTP: ", fullOTP);
    try {
      const response = await verifyOTP(fullOTP, email);

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }
      setEntermail(false);
      setViewVer(false);
      setRegister(true);
    } catch (error) {
      console.error("Could not verify OTP:", error);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div>
      <div className="bg-[]"></div>

      {viewVer && (
        <section className="fixed w-full h-full bg-transparent z-99 flex items-center justify-center">
          <div className="w-full m-2 md:w-5/12 bg-white rounded-lg h-[40vh] md:h-[60vh] border-2 p-14 flex flex-col justify-center text-center">
            <h2 className="font-bold text-xl md:text-3xl">
              Lets verify you are human
            </h2>
            <p>
              Kindly enter the 4-digit password sent to you to verify your
              account
            </p>
            <div className="w-full flex items-center justify-center">
              <div className="my-2 flex space-x-2 w-full md:w-6/12 justify-center">
                {OTP.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(event) =>
                      handleOTPChange(event.target.value, index)
                    }
                    onFocus={() => handleFocus(index)}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className={`w-1/4 p-3 border-2 ${
                      focusedIndex === index
                        ? "border-blue-900/90"
                        : "border-gray-500"
                    } focus:outline-none rounded-lg text-center`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <Image alt="" src={Section} className="img-fluid hidden md:block" />
      {enterMail && (
        <div className="container mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 items-center mt-5">
          <div className="md:ms-32 order-last md:order-1">
            <h1 className="text-4xl font-bold tracking-wider">Get Started!</h1>
            <p className="text-lg tracking-wide">
              We Will Help you set up an account in less than a minute
            </p>
            <div className="login-form mt-5">
              <form className="">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-medium text-gray-900 "
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={(event) => setEmail(event.target?.value)}
                    className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-3 placeholder-gray-500 focus:outline-none"
                    placeholder="email@gmail.com"
                    required
                  />
                </div>
                <div
                  onClick={handleVerifyEmail}
                  className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-lg text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl w-full"
                >
                  Create an Account
                </div>
                <p className="mt-3 tracking-wider">
                  Already has an Account?{" "}
                  <span className="font-bold">
                    <Link href="">Login?</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
          <div className="order-2 border border-blue-500 rounded-md p-4 ll w-full md:w-8/12 bg-blue-200 bg-opacity-20 flex items-center justify-center">
            <Image
              src={login}
              alt=""
              className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5"
            />
          </div>
        </div>
      )}
      {register && (
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
          <form
            onSubmit={handleSubmit}
            className="container mx-auto md:w-3/4 px-5 "
          >
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
                  value={name}
                  onChange={(event) => setName(event.target?.value)}
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
                  placeholder={email}
                  disabled
                  required
                />
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
                    <option value="">Select City</option>
                    <option value="Delta">Delta</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
                >
                  Password
                  <button type="button" onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
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
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmpassword"
                  name="confirmpassword"
                  value={confPass}
                  onChange={(event) => setConfPass(event.target?.value)}
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
      )}
      <footer>
        <p className="text-center text-sm font-mono font-bold my-10 flex items-end justify-center text-gray-500">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
    </div>
  );
}

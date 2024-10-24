import Image from "next/image";
import Link from "next/link";
import Logo from "/public/logo-dark.png";
import { Metadata } from "next";
import { FaRegUserCircle } from "react-icons/fa";
import { BsEnvelopeAt } from "react-icons/bs";

export const metadata: Metadata = {
  title: "FastBuka",
};

const Profile = () => {
  return (
    <>
      <div className="flex justify-center">
        <Image src={Logo} alt="Profile" className="rounded-full" />
      </div>
      <h1 className="text-2xl font-bold text-center mt-3">Rodinia Kitchen</h1>

      <div className="mt-5">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <FaRegUserCircle />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none "
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Devid Jhon"
                        defaultValue="Devid Jhon"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="+990 3343 7865"
                      defaultValue="+990 3343 7865"
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <BsEnvelopeAt />
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="devidjond45@gmail.com"
                      defaultValue="devidjond45@gmail.com"
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="Username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none"
                    type="text"
                    name="Username"
                    id="Username"
                    placeholder="devidjhon24"
                    defaultValue="devidjhon24"
                    disabled
                  />
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Edit Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

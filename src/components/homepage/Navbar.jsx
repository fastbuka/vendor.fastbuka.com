"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo-dark.png";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="bg-white shadow-md sticky top-0 w-full z-10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src={Logo}
                  className="img-fluid"
                  alt="Fastbuka"
                  width={70}
                  height={70}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse hidden md:block">
              <Link href="/auth/login">
                <button
                  type="button"
                  className="text-white bg-[#0a3a6b] border border-[#0a3a6b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
                >
                  Login
                </button>
              </Link>

              <Link href="/auth/register">
                <button
                  type="button"
                  className="text-white bg-[#0a3a6b] border border-[#0a3a6b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm px-4 py-2 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
                >
                  Register
                </button>
              </Link>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-[#0a3a6b] md:p-0 md:dark:text-blue-500 font-semibold"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0a3a6b] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0a3a6b] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0a3a6b] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 hover:text-[#0a3a6b] focus:outline-none"
              >
                {isOpen ? (
                  <HiX className="w-6 h-6" /> // Close icon when menu is open
                ) : (
                  <HiMenu className="w-6 h-6" /> // Hamburger icon when menu is closed
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white w-full absolute top-[100px]">
              <Link
                href="#"
                className="block text-gray-800 px-3 py-2 rounded-md text-base font-semibold hover:bg-gray-200"
              >
                Home
              </Link>
              <Link
                href="#"
                className="block text-gray-800 px-3 py-2 rounded-md text-base font-semibold hover:bg-gray-200"
              >
                About
              </Link>
              <Link
                href="#"
                className="block text-gray-800 px-3 py-2 rounded-md text-base font-semibold hover:bg-gray-200"
              >
                Services
              </Link>
              <Link
                href="#"
                className="block text-gray-800 px-3 py-2 rounded-md text-base font-semibold hover:bg-gray-200"
              >
                Contact
              </Link>
              <div className="flex">
                <Link href="/auth/login">
                  <button
                    type="button"
                    className="text-white bg-[#0a3a6b] border border-[#0a3a6b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl me-3"
                  >
                    Login
                  </button>
                </Link>

                <Link href="/auth/register">
                  <button
                    type="button"
                    className="text-white bg-[#0a3a6b] border border-[#0a3a6b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm px-4 py-2 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

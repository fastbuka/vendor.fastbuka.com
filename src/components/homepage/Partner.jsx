import React from "react";
import Image from "next/image";
import Link from "next/link";
import handshake from "../../../public/images/homepage/handshake.png";

export default function Partner() {
  return (
    <div className="bg-[#f2f9ff]" id="waitlist">
      <div className="mt-10 ">
        <div className="flex justify-center">
          <Image src={handshake} alt="handshake" className="mt-10" />
        </div>
        <h1
          className="
      text-[#0a3a6b] font-black md:text-4xl text-center text-4xl mb-10"
        >
          Get Involved with FastBuka – The Future of Food Delivery
        </h1>
      </div>
      <div className="container mx-auto md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-20 px-10">
          <div className="rounded-2xl  bg-white md:my-5">
            <div className="p-5">
              <h1 className="text-2xl text-center font-bold">Join as a User</h1>
              <p className="text-lg mt-3">
                Be the first to enjoy convenient food delivery once we launch
                
              </p>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl mt-5"
              >
                Join Now
              </button>
            </div>
          </div>
          <div className="shadow shadow-xl rounded-2xl  bg-white md:my-5">
            <div className="p-5">
              <h1 className="text-2xl text-center font-bold">
                Become a Vendor
              </h1>
              <p className="text-lg mt-3">
                Sign up to grow your food business with FastBuka
              </p>
              <Link href="/vendor/register">
                <button
                  type="button"
                  className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl mt-5"
                >
                  Join Now
                </button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl  bg-white md:my-5 mb-20">
            <div className="p-5">
              <h1 className="text-2xl text-center font-bold">
                Become a Delivery Agent
              </h1>
              <p className="text-lg mt-3">
                Join our delivery team and help bring delicious needs to
                customers
              </p>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl mt-5"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import handshake from "../../../public/images/homepage/handshake.png";

export default function Partner() {
  return (
    <div className="bg-[#f2f9ff]">
      <div className="mt-10 ">
        <div className="flex justify-center">
          <Image src={handshake} alt="handshake" className="mt-10" />
        </div>
        <h1
          className="
      text-[#0a3a6b] font-black md:text-4xl text-center text-4xl md:tracking-wider mb-10"
        >
          Work With Us
        </h1>
      </div>
      <div className="container mx-auto md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-20 px-10">
          <div className="shadow shadow-xl rounded-2xl  bg-white md:my-5">
            <div className="p-5">
              <h1 className="text-2xl text-center font-bold">Become a Rider</h1>
              <p className="text-lg mt-3">
                Experience flexibility, freedom, and competitive earnings by
                delivering with Fastbuka.
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
                A platform for managing menus and taking orders, along with
                tools to boost visibility and attract more customers.
              </p>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl mt-5"
              >
                Join Now
              </button>
            </div>
          </div>
          <div className="shadow shadow-xl rounded-2xl  bg-white md:my-5 mb-20">
            <div className="p-5">
              <h1 className="text-2xl text-center font-bold">
                Become a Partner
              </h1>
              <p className="text-lg mt-3">
                Grow with Fastbuka! Our technology and user base can help you
                boost sales and unlock new opportunities!
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

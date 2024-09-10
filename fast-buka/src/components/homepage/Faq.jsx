import React from "react";

export default function Faq() {
  return (
    <div className="bg-[#53e0ae]">
      <div className="grid md:grid-cols-2 grid-cols-1 md:place-items-center  container md:mx-5 px-4 py-20">
        <div className="">
          <h1 className="font-bold md:text-4xl text-3xl tracking-wider">
            Want to learn more?
          </h1>
          <button
            type="button"
            className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-[#53e0ae] hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl md:mt-5"
          >
            Learn More
          </button>
        </div>
        <div>
          <p className="md:me-32 text-white text-md md:text-lg tracking-wider md:mt-0 mt-5">
            To find out more about our products, offers and services or if you
            have any question, please get in touch.
          </p>
        </div>
      </div>
    </div>
  );
}

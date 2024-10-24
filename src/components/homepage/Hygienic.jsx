import React from "react";
import Image from "next/image";
import Food_and_flower from "/public/Food_and_flower.png";

export default function Hygienic() {
  return (
    <div className="bg-[#3ab764] rounded-3xl mt-14 hygiene">
      {/* <div className="flex justify-center">
        <Image
          src={Food_and_flower}
          alt="food_and_flower"
          className="bounce img-fluid md:w-2/5 w-4/5 relative md:top-[-160px] top-[-140px]"
        />
      </div> */}
      <h1 className="text-white text-5xl text-center font-black pt-10">How FastBuka Works </h1>
      <div className="grid md:grid-cols-3 gap-5 grid-cols-1 md:place-items-center place-items-center container md:mx-5 px-4 relative">
      {/* <div className="grid md:grid-cols-3 gap-5 grid-cols-1 md:place-items-center place-items-center container md:mx-5 px-4 relative md:top-[-160px] top-[-140px]"> */}
        {/* <div className="">
          <h1 className="text-white font-black md:text-5xl text-4xl tracking-wider">
            Hygience and Nutritious Meal
          </h1>
        </div> */}
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white">Step 1</h1>
          <p className="text-left text-xl tracking-wider mt-7 text-white">
            Choose Your Favorite Meal
          </p>
          <p className="text-white text-md md:text-lg mt-3 tracking-wider">
            Browse through a variety of local food vendors and choose your
            favorite meals with just a few clicks.
          </p>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl md:text-center font-black text-white">Step 2</h1>
          <p className="text-left md:text-center text-xl tracking-wider mt-7 text-white">
            Fast Delivery to Your Doorstep
          </p>
          <p className="text-white text-md md:text-lg mt-3 tracking-wider">
            Your food will be delivered quickly by one of our trusted delivery
            agents, ensuring freshness and quality.
          </p>
        </div>
        <div>
        <h1 className="text-3xl md:text-4xl md:text-right font-black text-white">Step 3</h1>
          <p className="text-left md:text-right text-2xl tracking-wider mt-7 text-white">
            Fast & Secure Payment
          </p>
          <p className="text-white text-md md:text-lg mt-3 tracking-wider">
            Make quick and secure payments powered by Stellar blockchain
            technology, ensuring safe transactions for everyone.
          </p>
          {/* <button
            type="button"
            className="text-[#3ab764] bg-white border border-white font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-[#3ab764] hover:text-white duration-300 hover:drop-shadow-2xl mt-5"
          >
            See Menu
          </button> */}
        </div>
      </div>
    </div>
  );
}

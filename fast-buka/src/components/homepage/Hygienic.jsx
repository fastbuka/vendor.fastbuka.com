import React from "react";
import Image from "next/image";
import Food_and_flower from "../../../public/images/Food_and_flower.png";

export default function Hygienic() {
  return (
    <div className="bg-[#0a3a6b] rounded-3xl mt-48 hygiene">
      <div className="flex justify-center">
        <Image
          src={Food_and_flower}
          className="bounce img-fluid md:w-2/5 w-4/5 relative md:top-[-160px] top-[-140px]"
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:place-items-center place-items-center container md:mx-5 px-4 relative md:top-[-160px] top-[-140px]">
        <div className="">
          <h1 className="text-white font-black md:text-5xl  text-4xl tracking-wider md:ms-32">
            Hygience and Nutritious Meal
          </h1>
        </div>
        <div>
          <p className="md:me-32 mt-5 text-white text-md md:text-lg mt-3 tracking-wider">
            Craving a delicious meal but short on time? We've got you covered
            with our fast and fresh delivery service. Place your order and enjoy
            hot, freshly-prepared dishes delivered right to your doorstep.
            Satisfaction guaranteed!
          </p>
          <button
            type="button"
            className="text-[#0a3a6b] bg-white border border-white font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-[#0a3a6b] hover:text-white duration-300 hover:drop-shadow-2xl mt-5"
          >
            See Menu
          </button>
        </div>
      </div>
    </div>
  );
}

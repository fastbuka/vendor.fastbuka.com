"use client";
import Turkey from "../../../public/images/turkey.jpg";
import JellofRice from "../../../public/images/jollof1.jpg";
import Drinks from "../../../public/images/drinks.jpg";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";

const Category: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <Link href="#">
          <CardDataStats
            total="Rice"
            title=""
            rate="Total Item: 5"
          >
            <Image
              src={JellofRice}
              alt="JellofRice"
              className="img-fluid rounded-full object-cover h-10 w-30"
            />
          </CardDataStats>
        </Link>

        <Link href="#">
          <CardDataStats
            total="Protein (Meat)"
            title=""
            rate="Total Item: 5"
          >
            <Image
              src={Turkey}
              alt="Turkry"
              className="img-fluid rounded-full object-cover h-10 w-30"
            />
          </CardDataStats>
        </Link>

        <Link href="#">
          <CardDataStats
            total="Drinks"
            title=""
            rate="Total Item: 30"
          >
            <Image
              src={Drinks}
              alt="JellofRice"
              className="img-fluid rounded-full object-cover h-10 w-30"
            />
          </CardDataStats>
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8"></div>
      </div>
    </>
  );
};

export default Category;

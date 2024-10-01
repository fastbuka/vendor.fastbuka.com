"use client";
import Beef from "../../../public/images/beef.jpg";
import Chicken from "../../../public/images/chicken1.jpg";
import Turkey from "../../../public/images/turkey.jpg";
import JellofRice from "../../../public/images/jollof1.jpg";
import WhiteRice from "../../../public/images/white-rice.jpg";
import FriedRice from "../../../public/images/friedrice.jpg";
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
            total="Jellof Rice"
            title="2,000"
            rate="Category: Rice"
          >
            <Image
            src={JellofRice}
            alt="JellofRice"
            className="img-fluid rounded-full object-cover h-10 w-30"/>
          </CardDataStats>
        </Link>

        <Link href="#">
          <CardDataStats total="Fried Rice" title="2,000" rate="Category: Rice">
          <Image
            src={FriedRice}
            alt="JellofRice"
            className="img-fluid rounded-full object-cover h-10 w-30"/>
          </CardDataStats>
        </Link>

        <Link href="#">
          <CardDataStats total="White Rice" title="2,000" rate="Category: Rice">
          <Image
            src={WhiteRice}
            alt="JellofRice"
            className="img-fluid rounded-full object-cover h-10 w-30"/>
          </CardDataStats>
        </Link>

        <Link href="#">
          <CardDataStats total="Turkey" title="5,000" rate="Category: Meat">
            <Image
            src={Turkey}
            alt="JellofRice"
            className="img-fluid rounded-full object-cover h-10 w-30"/>
          </CardDataStats>
        </Link>

        <Link href="#">
          <CardDataStats total="Chicken" title="3,500" rate="Category: Meat">
          <Image
            src={Chicken}
            alt="JellofRice"
            className="img-fluid rounded-full object-cover h-10 w-30"/>
          </CardDataStats>
        </Link>

        <Link href="#">
          <CardDataStats total="Beef" title="1,000" rate="Category: Meat">
          <Image
            src={Beef}
            alt="JellofRice"
            className="img-fluid rounded-full object-cover h-10 w-30"/>
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

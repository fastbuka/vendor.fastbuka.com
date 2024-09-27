"use client";
import Link from "next/link";
import Image from "next/image";
import Nigeria from "../../../public/images/nigeria2.png";
import USDC from "../../../public/images/usdc.png";
import XLM from "../../../public/images/xlm.png";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";

const Deposit: React.FC = () => {
  return (
    <>
      <h1>Choose Your Deposit Currency</h1>
      <input type="text" className="w-full p-3 rounded-xl mt-5" placeholder="Search"/>
      <ul className="mt-5 list-style-none">
        <li className="bg-white p-3 rounded-xl shadow shadow-dark font-medium my-3">
          <Link href="#" className="flex gap-5">
            <Image src={Nigeria} width="50" height="50" alt="icon" className="rounded-xl" />
            Nigeria Naira <br />
            NGN
          </Link>
        </li>
        <li className="bg-white p-3 rounded-xl shadow shadow-dark font-medium my-3">
          <Link href="#" className="flex gap-5">
            <Image src={USDC} width="50" height="50" alt="icon" className="rounded-xl" />
            Dollar USD <br />
            USDC
          </Link>
        </li>
        <li className="bg-white p-3 rounded-xl shadow shadow-dark font-medium my-3">
          <Link href="#" className="flex gap-5">
            <Image src={XLM} width="50" height="50" alt="icon" className="rounded-xl" />
            Stellar <br />
            XLM
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Deposit;

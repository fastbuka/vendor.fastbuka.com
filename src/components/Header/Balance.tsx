"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";

const Balance = () => {
  const [balance, setBalance] = useState(false);
  const toggleBalance = () => {
    setBalance(!balance);
  };

  return (
    <>
      <div className="flex">
        <button type="button" onClick={toggleBalance}>
          {balance ? <BiShowAlt size="26px" /> : <BiHide size="26px" />}
        </button>
        <div className="grid grid-cols-3 gap-10">
          <div className="flex items-center justify-center ">
            <h1 className="font-mono font-black text-sm 2xl:text-xl ms-2">Total: </h1>
            <input
              type={balance ? "password" : "text"}
              id="password"
              name="password"
              value="3,800,000"
              className="font-mono font-black text-sm 2xl:text-xl ms-2 block w-1/2 bg-white"
              placeholder="Password"
              required
              disabled
            />
          </div>
          <div className="flex items-center justify-center border-l-2 border-[#3ab764] ">
            <h1 className="font-mono font-black text-sm 2xl:text-xl ms-2">NGN: </h1>
            <input
              type={balance ? "password" : "text"}
              id="password"
              name="password"
              value="1,900,000"
              className="font-mono font-black text-sm 2xl:text-xl ms-2 block w-1/2 bg-white"
              placeholder="Password"
              required
              disabled
            />
          </div>
          <div className="flex items-center justify-center border-l-2 border-[#3ab764] mx-auto">
          <h1 className="font-mono font-black text-sm 2xl:text-xl ms-2">NGNC: </h1>
            <input
              type={balance ? "password" : "text"}
              id="password"
              name="password"
              value="1,900,000"
              className="font-mono font-black text-sm 2xl:text-xl ms-2 block w-1/2 bg-white"
              placeholder="Password"
              required
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Balance;

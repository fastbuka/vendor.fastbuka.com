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
    <div className="flex">
      <input
        type={balance ? "password" : "text"}
        id="password"
        name="password"
        value="N1,900"
        className="border border-none font-mono font-black text-xl py-4 rounded-full block w-1/2 bg-white p-3"
        placeholder="Password"
        required
        disabled
      />
      {/* <h1 className="font-mono font-black text-3xl py-4">$19,000</h1> */}
      <button type="button" onClick={toggleBalance}>
        {balance ? (
          <BiShowAlt size="26px"/>
        ) : (
          <BiHide size="26px"/>
        )}
      </button>
    </div>
  );
};

export default Balance;

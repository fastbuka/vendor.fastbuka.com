"use client";
import Link from "next/link";
import Image from "next/image";
import Nigeria from "../../../public/nigeria2.png";
import dynamic from "next/dynamic";
import { useState } from "react";
import CardDataStats from "../CardDataStats";

const Deposit: React.FC = () => {
  return (
    <>
      <h1>Choose Your Withdrawal Currency</h1>

      <div className="w-full mx-auto">
        <div className="bg-white p-3 rounded-xl shadow shadow-dark font-medium my-3">
          <span className="flex gap-5">
            <Image
              src={Nigeria}
              width="50"
              height="50"
              alt="icon"
              className="rounded-xl"
            />
            Nigeria Naira <br />
            NGNC
          </span>
        </div>
      </div>

      <form className="">
        <div className="mb-3">
          <label
            htmlFor="bank_account"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Bank Account:
          </label>
          <select
            id="bank_account"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="bank_account"
          >
            <option selected>Choose a bank</option>
            <option value="US">Access Bank</option>
            <option value="CA">Opay</option>
            <option value="FR">UBA</option>
            <option value="DE">Palmpay</option>
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="account_number"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Account Number:
          </label>
          <input
            type="number"
            min="5000"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="account_number"
            name="account_number"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="account_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Account Name:
          </label>
          <input
            type="number"
            min="5000"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="account_name"
            name="account_name"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Amount:
          </label>
          <input
            type="number"
            min="5000"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="amount"
            name="amount"
          />
        </div>

        <button type="submit" className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl mt-5">Next</button>
      </form>
    </>
  );
};

export default Deposit;

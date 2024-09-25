"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Deposit from "../../../public/images/deposit.png";
import Pay from "../../../public/images/pay.png";
import Swap from "../../../public/images/swap.png";
import CardDataStats from "../CardDataStats";
import ExchangeRate from "@/components/Charts/ChartOne";
import MonthlyOverview from "@/components/Charts/ChartTwo";

const ECommerce: React.FC = () => {
  const data = [
    { id: 1, name: "Burger", category: "Food", price: 10.99 },
    { id: 2, name: "Pizza", category: "Food", price: 8.99 },
    { id: 3, name: "Coke", category: "Drink", price: 1.99 },
    { id: 4, name: "Fries", category: "Food", price: 2.99 },
    { id: 5, name: "Salad", category: "Food", price: 5.99 },
    { id: 6, name: "Water", category: "Drink", price: 0.99 },
    { id: 7, name: "Ice Cream", category: "Dessert", price: 4.99 },
    { id: 8, name: "Pasta", category: "Food", price: 7.99 },
    { id: 9, name: "Juice", category: "Drink", price: 2.99 },
    { id: 10, name: "Sandwich", category: "Food", price: 6.99 },
    // Add more data as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  const [balance, setBalance] = useState(false);
  const toggleBalance = () => {
    setBalance(!balance);
  };

  return (
    <>
      <h1 className="font-bold text-black text-xl my-3">Hi, Rodinia </h1>
      <div className="grid text-black grid-cols-3 gap-4 md:grid-cols-6 md:gap-6 xl:grid-cols-6 2xl:gap-7.5">
        <div className="col-span-3 bg-[#f2f9ff] border border-[#ddeeff] rounded-xl">
          <div className="p-5">
            <h1 className="font-medium text-xl">Your Balance</h1>
            <div className="flex gap-5">
              <input
                type={balance ? "password" : "text"}
                id="password"
                name="password"
                value="N1,900"
                className="border border-none font-mono font-black text-3xl py-4 rounded-full block w-auto bg-[#f2f9ff] p-3"
                placeholder="Password"
                required
                disabled
              />
              {/* <h1 className="font-mono font-black text-3xl py-4">$19,000</h1> */}
              <button type="button" onClick={toggleBalance}>
                {balance ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <div className="p-3">
            <Image src={Deposit} alt="deposit" />
            <h1 className="font-medium text-xl mt-1">Deposit</h1>
          </div>
        </div>
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <div className="p-3">
            <Image src={Pay} alt="pay" />
            <h1 className="font-medium text-xl mt-1">Pay</h1>
          </div>
        </div>
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <div className="p-3">
            <Image src={Swap} alt="swap" />
            <h1 className="font-medium text-xl mt-1">Swap</h1>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5 mt-5">
        <MonthlyOverview />
        <ExchangeRate />
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-xl text-black font-bold my-5">
          Transaction History
        </h1>
        <div className="flex gap-5 items-center md:justify-between">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 md:p-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Entries per Page Dropdown */}
          <div className="mb-4">
            <label className="mr-2 text-gray-700">Entries per page:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-hidden shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 text-sm font-semibold">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Customer Name</th>
                <th className="py-4 px-6">Phone Number</th>
                <th className="py-4 px-6">Order Number</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">{item.category}</td>
                  <td className="py-4 px-6">{item.price.toFixed(2)}</td>
                  <td className="py-4 px-6">{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-5 items-center md:justify-between">
          {/* Showing Entries Info */}
          <div className="mt-4">
            <p className="text-gray-700">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav>
              <ul className="inline-flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
                      } shadow-md`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8"></div>
      </div>
    </>
  );
};

export default ECommerce;

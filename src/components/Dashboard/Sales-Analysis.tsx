"use client";
import Turkey from "../../../public/turkey.jpg";
import JellofRice from "../../../public/jollof1.jpg";
import Drinks from "../../../public/drinks.jpg";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import CardDataStats from "../CardDataStats";
const MonthlyOverview = dynamic(() => import("../../components/Charts/ChartTwo"), {
  ssr: false,
});
const ChartOne = dynamic(() => import("../../components/Charts/ChartOne"), {
  ssr: false,
});
const ChartThree = dynamic(() => import("../../components/Charts/ChartThree"), {
  ssr: false,
});

const Sales: React.FC = () => {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  const [balance, setBalance] = useState(false);
  const toggleBalance = () => {
    setBalance(!balance);
  };
  return (
    <>
      <div className="flex flex-row-reverse">
        <select
          name="#"
          id="#"
          className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-3 text-md border rounded-full text-center font-medium outline-none m-2"
        >
          <option value="" className="">
            Today
          </option>
          <option value="" className="">
            Last Week
          </option>
          <option value="" className="">
            Last Month
          </option>
        </select>
      </div>
      <div className="grid text-black grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <div className="p-3">
            <h1 className="text-3xl font-bold">1,000,000</h1>
            <h1 className="font-medium text-md mt-1">All Time Sales</h1>
          </div>
        </div>
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <div className="p-3">
            <h1 className="text-3xl font-bold">300,000</h1>
            <h1 className="font-medium text-md mt-1">
              Total Sales of the Month
            </h1>
          </div>
        </div>
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <div className="p-3">
            <h1 className="text-3xl font-bold">100,000</h1>
            <h1 className="font-medium text-md mt-1">
              Total Sales for the Week
            </h1>
          </div>
        </div>
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <div className="p-3">
            <h1 className="text-3xl font-bold">30,000</h1>
            <h1 className="font-medium text-md mt-1">Daily Sale</h1>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="">
          <h1 className="font-medium text-xl mt-5">Monthly Report</h1>
          <MonthlyOverview />
        </div>
        <div className="">
          <h1 className="font-medium text-xl mt-5">Weekly Report</h1>
          <ChartThree />
        </div>
        <div className="">
          <h1 className="font-medium text-xl mt-5">Yearly Report</h1>
          <ChartOne />
        </div>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl text-black font-bold my-5">
            Transaction History
          </h1>
          <div className="max-w-6xl mx-auto p-1">
            <div className="flex gap-5 items-center md:justify-between">
              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search......"
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
            <div className="grid">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-gray-600 text-sm font-semibold">
                      <th className="py-4 px-6">ID</th>
                      <th className="py-4 px-6">Customer Name</th>
                      <th className="py-4 px-6">Order Number</th>
                      <th className="py-4 px-6">Items</th>
                      <th className="py-4 px-6">Price</th>
                      <th className="py-4 px-6">Quantity</th>
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
                        <td className="py-4 px-6">{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        </div>
      </div>
    </>
  );
};

export default Sales;

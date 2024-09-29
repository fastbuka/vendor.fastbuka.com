"use client";
import React, { useState } from "react";

const Order = () => {
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

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex flex-row-reverse my-3">
        <select
          name="#"
          id="#"
          className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-3 text-md border rounded-full text-center font-medium outline-none m-2"
        >
          <option value="" className="dark:bg-boxdark">
            Active Orders
          </option>
          <option value="" className="dark:bg-boxdark">
            Recent Orders
          </option>
          <option value="" className="dark:bg-boxdark">
            Order History
          </option>
        </select>
      </div>

      <div className="flex flex-wrap gap-5 items-center md:justify-between">
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
      <div className="grid">
        <div className="overflow-x-auto">
          <div className="w-full shadow-lg rounded-xl">
            <table className="w-full bg-white">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-xs sm:text-sm font-semibold">
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Customer Name
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Phone Number
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Order Number
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Delivery Address
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Payment Method
                  </th>
                  <th className="py-2 sm:py-4 px-2 sm:px-6 whitespace-nowrap">
                    Payment Status
                  </th>
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
                    <td className="py-2 sm:py-4 px-2 sm:px-6">{item.id}</td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">{item.name}</td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">
                      {item.category}
                    </td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">{item.name}</td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">{item.name}</td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">
                      {item.category}
                    </td>
                    <td className="py-2 sm:py-4 px-2 sm:px-6">
                      {item.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 items-center md:justify-between mt-4">
        {/* Showing Entries Info */}
        <div>
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
  );
};

export default Order;

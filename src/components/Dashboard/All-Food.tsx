"use client";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import FoodImage from "../../../public/food_1.png";
import Image from "next/image";

// Define the type for the category keys
type FoodCategory = "appetizer" | "main" | "dessert" | "drink";

// Sample data: categories and food items
const foodData = {
  appetizer: [
    { id: 1, name: "Spring Rolls", price: 5.99, imageUrl: FoodImage },
    { id: 2, name: "Bruschetta", price: 7.99, imageUrl: FoodImage },
    { id: 3, name: "Spring Rolls", price: 5.99, imageUrl: FoodImage },
    { id: 4, name: "Bruschetta", price: 7.99, imageUrl: FoodImage },
    { id: 5, name: "Spring Rolls", price: 5.99, imageUrl: FoodImage },
    { id: 6, name: "Bruschetta", price: 7.99, imageUrl: FoodImage },
    { id: 7, name: "Spring Rolls", price: 5.99, imageUrl: FoodImage },
    { id: 8, name: "Bruschetta", price: 7.99, imageUrl: FoodImage },
    { id: 9, name: "Spring Rolls", price: 5.99, imageUrl: FoodImage },
    { id: 10, name: "Bruschetta", price: 7.99, imageUrl: FoodImage },
    { id: 11, name: "Spring Rolls", price: 5.99, imageUrl: FoodImage },
    { id: 12, name: "Bruschetta", price: 7.99, imageUrl: FoodImage },
  ],
  main: [
    { id: 13, name: "Grilled Chicken", price: 12.99, imageUrl: FoodImage },
    { id: 14, name: "Beef Steak", price: 19.99, imageUrl: FoodImage },
    { id: 15, name: "Grilled Chicken", price: 12.99, imageUrl: FoodImage },
    { id: 16, name: "Beef Steak", price: 19.99, imageUrl: FoodImage },
    { id: 17, name: "Grilled Chicken", price: 12.99, imageUrl: FoodImage },
    { id: 18, name: "Beef Steak", price: 19.99, imageUrl: FoodImage },
    { id: 19, name: "Grilled Chicken", price: 12.99, imageUrl: FoodImage },
    { id: 20, name: "Beef Steak", price: 19.99, imageUrl: FoodImage },
    { id: 21, name: "Grilled Chicken", price: 12.99, imageUrl: FoodImage },
    { id: 22, name: "Beef Steak", price: 19.99, imageUrl: FoodImage },
    { id: 23, name: "Grilled Chicken", price: 12.99, imageUrl: FoodImage },
    { id: 24, name: "Beef Steak", price: 19.99, imageUrl: FoodImage },
  ],
  dessert: [
    { id: 25, name: "Chocolate Cake", price: 4.99, imageUrl: FoodImage },
    { id: 26, name: "Ice Cream Sundae", price: 3.99, imageUrl: FoodImage },
    { id: 27, name: "Chocolate Cake", price: 4.99, imageUrl: FoodImage },
    { id: 28, name: "Ice Cream Sundae", price: 3.99, imageUrl: FoodImage },
    { id: 29, name: "Chocolate Cake", price: 4.99, imageUrl: FoodImage },
    { id: 30, name: "Ice Cream Sundae", price: 3.99, imageUrl: FoodImage },
    { id: 31, name: "Chocolate Cake", price: 4.99, imageUrl: FoodImage },
    { id: 32, name: "Ice Cream Sundae", price: 3.99, imageUrl: FoodImage },
    { id: 33, name: "Chocolate Cake", price: 4.99, imageUrl: FoodImage },
    { id: 34, name: "Ice Cream Sundae", price: 3.99, imageUrl: FoodImage },
    { id: 35, name: "Chocolate Cake", price: 4.99, imageUrl: FoodImage },
    { id: 36, name: "Ice Cream Sundae", price: 3.99, imageUrl: FoodImage },
  ],
  drink: [
    { id: 37, name: "Lemonade", price: 2.99, imageUrl: FoodImage },
    { id: 38, name: "Cappuccino", price: 4.99, imageUrl: FoodImage },
    { id: 39, name: "Lemonade", price: 2.99, imageUrl: FoodImage },
    { id: 40, name: "Cappuccino", price: 4.99, imageUrl: FoodImage },
    { id: 41, name: "Lemonade", price: 2.99, imageUrl: FoodImage },
    { id: 42, name: "Cappuccino", price: 4.99, imageUrl: FoodImage },
    { id: 43, name: "Lemonade", price: 2.99, imageUrl: FoodImage },
    { id: 44, name: "Cappuccino", price: 4.99, imageUrl: FoodImage },
    { id: 45, name: "Lemonade", price: 2.99, imageUrl: FoodImage },
    { id: 46, name: "Cappuccino", price: 4.99, imageUrl: FoodImage },
    { id: 47, name: "Lemonade", price: 2.99, imageUrl: FoodImage },
    { id: 48, name: "Cappuccino", price: 4.99, imageUrl: FoodImage },
  ],
};

const SidebarWithFoodItems: React.FC = () => {
  // State to track selected category
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory>("appetizer");

  // Function to handle category selection
  const handleCategoryClick = (category: FoodCategory) => {
    setSelectedCategory(category);
  };

  return (
    <div className="md:flex ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="sticky top-30">
          <h2 className="text-lg font-semibold mb-6 text-black">
            Food Categories
          </h2>
          <ul className="text-black text-md">
            {(Object.keys(foodData) as Array<FoodCategory>) // Cast the keys to FoodCategory[]
              .map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`block w-full text-left p-4 my-2 rounded-lg hover:bg-gray-700 ${
                      selectedCategory === category ? "bg-gray-700" : ""
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-100">
        <h2 className="text-lg font-semibold mb-6">
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}{" "}
        </h2>

        {/* Conditional check before rendering the items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {foodData[selectedCategory]?.length > 0 ? (
            foodData[selectedCategory].map((foodItem) => (
              <div
                key={foodItem.id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                {/* Food Name */}
                <h3 className="text-xl font-semibold mb-2">{foodItem.name}</h3>
                {/* Image */}
                <Image
                  src={foodItem.imageUrl}
                  alt={foodItem.name}
                  className="w-auto h-[100px] object-cover rounded-lg mb-4"
                />

                {/* Price */}
                <p className="text-lg text-gray-700 mb-4">
                  ${foodItem.price.toFixed(2)}
                </p>

                {/* Action Icons: Edit, View, Delete */}
                <div className="flex justify-between">
                  <button className="text-blue-600 hover:text-blue-700">
                    <FaEye size={20} />
                  </button>
                  <button className="text-green-600 hover:text-green-700">
                    <FaEdit size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">
              No items available in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarWithFoodItems;

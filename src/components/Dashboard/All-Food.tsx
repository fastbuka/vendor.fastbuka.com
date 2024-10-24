"use client";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import FoodImage from "/public/food_1.png";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Define the type for the category keys
type FoodCategory = "appetizer" | "main" | "dessert" | "drink";

type FoodItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string | StaticImport;
  description: string;
  discount: number;
};

// Sample data: categories and food items
const foodData = {
  appetizer: [
    {
      id: 1,
      name: "Spring Rolls",
      price: 5.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 2,
      name: "Bruschetta",
      price: 7.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 3,
      name: "Spring Rolls",
      price: 5.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 4,
      name: "Bruschetta",
      price: 7.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 5,
      name: "Spring Rolls",
      price: 5.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 6,
      name: "Bruschetta",
      price: 7.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 7,
      name: "Spring Rolls",
      price: 5.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 8,
      name: "Bruschetta",
      price: 7.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 9,
      name: "Spring Rolls",
      price: 5.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 10,
      name: "Bruschetta",
      price: 7.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 11,
      name: "Spring Rolls",
      price: 5.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 12,
      name: "Bruschetta",
      price: 7.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
  ],
  main: [
    {
      id: 13,
      name: "Grilled Chicken",
      price: 12.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 14,
      name: "Beef Steak",
      price: 19.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 15,
      name: "Grilled Chicken",
      price: 12.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 16,
      name: "Beef Steak",
      price: 19.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 17,
      name: "Grilled Chicken",
      price: 12.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 18,
      name: "Beef Steak",
      price: 19.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 19,
      name: "Grilled Chicken",
      price: 12.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 20,
      name: "Beef Steak",
      price: 19.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 21,
      name: "Grilled Chicken",
      price: 12.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 22,
      name: "Beef Steak",
      price: 19.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 23,
      name: "Grilled Chicken",
      price: 12.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 24,
      name: "Beef Steak",
      price: 19.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
  ],
  dessert: [
    {
      id: 25,
      name: "Chocolate Cake",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 26,
      name: "Ice Cream Sundae",
      price: 3.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 27,
      name: "Chocolate Cake",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 28,
      name: "Ice Cream Sundae",
      price: 3.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 29,
      name: "Chocolate Cake",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 30,
      name: "Ice Cream Sundae",
      price: 3.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 31,
      name: "Chocolate Cake",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 32,
      name: "Ice Cream Sundae",
      price: 3.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 33,
      name: "Chocolate Cake",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 34,
      name: "Ice Cream Sundae",
      price: 3.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 35,
      name: "Chocolate Cake",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 36,
      name: "Ice Cream Sundae",
      price: 3.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
  ],
  drink: [
    {
      id: 37,
      name: "Lemonade",
      price: 2.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 38,
      name: "Cappuccino",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 39,
      name: "Lemonade",
      price: 2.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 40,
      name: "Cappuccino",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 41,
      name: "Lemonade",
      price: 2.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 42,
      name: "Cappuccino",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 43,
      name: "Lemonade",
      price: 2.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 44,
      name: "Cappuccino",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 45,
      name: "Lemonade",
      price: 2.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 46,
      name: "Cappuccino",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 47,
      name: "Lemonade",
      price: 2.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 48,
      name: "Cappuccino",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
  ],
};

const SidebarWithFoodItems: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory>("appetizer");

  // State for modal visibility and selected food item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Function to handle category selection
  const handleCategoryClick = (category: FoodCategory) => {
    setSelectedCategory(category);
  };

  // Function to open the modal and set the selected food
  const handleViewDetails = (foodItem: FoodItem) => {
    setSelectedFood(foodItem);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <div className="flex gap-3">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white md:p-6">
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
      <div className="flex-1 md:p-8 bg-gray-100">
        <h2 className="text-lg font-semibold mb-6 text-black flex flex-row-reverse">
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}{" "}
        </h2>

        {/* Food Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {foodData[selectedCategory]?.length > 0 ? (
            foodData[selectedCategory].map((foodItem) => (
              <div
                key={foodItem.id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                {/* Image */}
                <Image
                  src={foodItem.imageUrl}
                  alt={foodItem.name}
                  className="w-auto h-[100px] object-cover rounded-lg mb-4"
                />

                {/* Food Name */}
                <h3 className="text-xl font-semibold mb-2">{foodItem.name}</h3>

                {/* Price */}
                <p className="text-lg text-gray-700 mb-4">
                  ${foodItem.price.toFixed(2)}
                </p>

                {/* Action Icons: View, Edit, Delete */}
                <div className="flex justify-between">
                  <button
                    className="text-blue-600"
                    onClick={() => handleViewDetails(foodItem)}
                  >
                    <FaEye size={20} />
                  </button>
                  <Link href={`/vendor/foods/${foodItem.id}`}>
                    <button className="text-green-600">
                      <FaEdit size={20} />
                    </button>
                  </Link>
                  <button className="text-[#dc2626]">
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

      {/* Modal for viewing food details */}
      {isModalOpen && selectedFood && (
        <div className="fixed top-10 md:top-24 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-3 w-full">
            {/* Close button */}
            <button
              className="relative left-[100%] text-[#dc2626] text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            {/* Food Image */}
            <Image
              src={selectedFood.imageUrl}
              alt={selectedFood.name}
              className="w-auto h-[100px] object-cover rounded-lg mb-4"
            />

            {/* Food Name */}
            <h2 className="text-2xl font-semibold mb-2">{selectedFood.name}</h2>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-4">
              Description: {selectedFood.description}
            </p>

            {/* Price */}
            <p className="text-md font-bold text-gray-900">
              Price: ${selectedFood.price.toFixed(2)}
            </p>

            {/* Discount */}
            <p className="text-md font-bold text-gray-900">
              Discount: ${selectedFood.discount.toFixed(2)}
            </p>

            {/* Close button */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-[#dc2626] text-white px-4 py-2 rounded-lg hover:bg-[#dc2626]"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarWithFoodItems;

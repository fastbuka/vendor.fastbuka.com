import React from "react";

const FoodForm: React.FC = () => {
  return (
    <>
      <form className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Category (Dropdown) */}
        <div className="mb-8">
          <label
            htmlFor="category"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Category
          </label>
          <select
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          >
            <option value="">Select a category</option>
            <option value="appetizer">Appetizer</option>
            <option value="main">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        {/* Food Name (Text) */}
        <div className="mb-8">
          <label
            htmlFor="foodName"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter the food name"
            required
          />
        </div>

        {/* Description (Textarea) */}
        <div className="mb-8">
          <label
            htmlFor="description"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Describe the food"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Image (File) */}
        <div className="mb-8">
          <label
            htmlFor="image"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            accept="image/*"
            required
          />
        </div>

        {/* Price (Number) */}
        <div className="mb-8">
          <label
            htmlFor="price"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter price"
            min={0}
            step="0.01"
            required
          />
        </div>

        {/* Discount (Number) */}
        <div className="mb-8">
          <label
            htmlFor="discount"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter discount"
            min={0}
            max={100}
            step="1"
          />
        </div>

        {/* Preparation Time (Number) */}
        <div className="mb-8">
          <label
            htmlFor="prepTime"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            id="prepTime"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter preparation time"
            min={0}
            step="1"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-lg text-lg px-6 py-3 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FoodForm;

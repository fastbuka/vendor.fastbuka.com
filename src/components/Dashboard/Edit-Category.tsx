"use client";
import React, { useState } from "react";
import Image from "next/image";
import placeholderImage from "../../../public/Food_and_flower.png"

const EditCategory: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-10">
        <form className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg md:order-1 order-2">
          {/* Category Name (Text) */}
          <div className="mb-8">
            <label
              htmlFor="categoryName"
              className="block mb-3 text-lg font-semibold text-gray-900"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Image (File) */}
          <div className="mb-8">
            <label
              htmlFor="categoryImage"
              className="block mb-3 text-lg font-semibold text-gray-900"
            >
              Image
            </label>
            <input
              type="file"
              id="categoryImage"
              className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
              accept="image/*"
              onChange={handleImageChange} // Add this to handle image change
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
        <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg md:order-2 order-1">
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-8">
              <p className="mb-2 text-lg font-semibold text-gray-900">
                Image Preview:
              </p>
              <Image
                src={imagePreview || placeholderImage}
                width={50}
                height={50}
                alt="Selected category"
                className="w-auto max-h-[250px] rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditCategory;

import React from 'react';

const CategoryForm: React.FC = () => {
  return (
    <form className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg ">
      {/* Category Name (Text) */}
      <div className="mb-8">
        <label htmlFor="categoryName" className="block mb-3 text-lg font-semibold text-gray-900">
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
        <label htmlFor="categoryImage" className="block mb-3 text-lg font-semibold text-gray-900">
          Image
        </label>
        <input
          type="file"
          id="categoryImage"
          className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none "
          accept="image/*"
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
  );
};

export default CategoryForm;

"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import FoodImage from "/public/food_1.png";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter, useParams } from "next/navigation";
import { useLogout, categoryImages } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";

interface UserProfile {
  profile: {
    first_name: string;
    user_uuid: string;
    email: string;
  };
}

interface Vendor {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  // Add other fields if needed
}

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
  ],
  main: [
    {
      id: 3,
      name: "Grilled Chicken",
      price: 12.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 4,
      name: "Beef Steak",
      price: 19.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
  ],
  dessert: [
    {
      id: 5,
      name: "Chocolate Cake",
      price: 4.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 6,
      name: "Ice Cream Sundae",
      price: 3.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
  ],
  drink: [
    {
      id: 7,
      name: "Lemonade",
      price: 2.99,
      imageUrl: FoodImage,
      description: "this is the decription of the food item",
      discount: 0.0,
    },
    {
      id: 8,
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

  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const { slug } = useParams(); // Get the slug directly from params
  const [vendor, setVendor] = useState<any | null>(null); // State to store vendor details
  const [categoryImageData, setCategoryImageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add new state for selected image UUIDs
  const [selectedImageUuids, setSelectedImageUuids] = useState<string[]>([]);

  // Add handler for image selection
  const handleImageClick = (uuid: string) => {
    setSelectedImageUuids(prev => 
      prev.includes(uuid) 
        ? prev.filter(id => id !== uuid) // Remove if already selected
        : [...prev, uuid] // Add if not selected
    );
  };

  // Fetch vendor data as a separate function
  const fetchVendor = async (slug: string) => {
    try {
      const response = await getVendorBySlug(slug); // Fetch vendor data using the slug

      // Assuming response.data contains your expected vendor data
      if (response?.data?.vendor) {
        setVendor(response.data.vendor);
      } else {
        throw new Error("Vendor not found");
      }
    } catch (err) {
      setError("Failed to fetch vendor details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push("/login");
    } else {
      setUser(userData as UserProfile);
    }

    if (slug) {
      fetchVendor(slug as string); // Call the fetchVendor function
    }

    const fetchCategoryImages = async () => {
      try {
        const userProfile = getUser() as UserProfile;
        if (!userProfile?.profile?.user_uuid) {
          throw new Error("User UUID not found");
        }

        const data = await categoryImages(userProfile.profile.user_uuid);
        setCategoryImageData(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch category images"
        );
        setLoading(false);
      }
    };

    fetchCategoryImages();
  }, [slug, router]);

  // Add new state for upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Add handler for file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Add handler for form submission
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    try {
      // Add your upload logic here
      console.log('Uploading file:', uploadFile);
      
      // Reset form and close modal after successful upload
      setUploadFile(null);
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!vendor) return null;

  return (
    <>
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
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}{" "}
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
                  <h3 className="text-xl font-semibold mb-2">
                    {foodItem.name}
                  </h3>

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
              <h2 className="text-2xl font-semibold mb-2">
                {selectedFood.name}
              </h2>

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

      {/* Modified Category images section */}
      <div className="w-full max-w-[70vw] mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Images:
          </label>
          <div className="flex flex-wrap gap-4">
            {selectedImageUuids.map((uuid) => {
              const selectedImage = categoryImageData?.data?.storage?.data?.find(
                (img: any) => img.uuid === uuid
              );
              return selectedImage ? (
                <div key={uuid} className="relative">
                  <Image
                    src={`${selectedImage.base_url}/${selectedImage.path}`}
                    alt={selectedImage.slug}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <button
                    onClick={() => handleImageClick(uuid)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              ) : null;
            })}
          </div>
          {/* Hidden input field for form submission */}
          <input
            type="hidden"
            name="selectedImages"
            value={selectedImageUuids.map(uuid => {
              const image = categoryImageData?.data?.storage?.data?.find(
                (img: any) => img.uuid === uuid
              );
              return image ? `${image.base_url}/${image.path}` : '';
            }).join(',')}
          />
        </div>

        <div className="relative overflow-x-auto bg-white rounded-lg">
          <div className="flex space-x-6 p-4 min-w-full">
            {categoryImageData?.data?.storage?.data?.map((image: any) => (
              <div 
                key={image.uuid} 
                className="flex-shrink-0 w-[100px] cursor-pointer"
                onClick={() => handleImageClick(image.uuid)}
              >
                <div className={`relative aspect-square ${
                  selectedImageUuids.includes(image.uuid) 
                    ? 'ring-2 ring-indigo-500' 
                    : ''
                }`}>
                  <Image
                    src={`${image.base_url}/${image.path}`}
                    alt={image.slug}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-[#3ab764] text-white px-4 py-2 rounded-lg"
            >
              Add Image
            </button>
          </div>
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
              
              <form onSubmit={handleUploadSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="bg-gray-500 text-red px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#3ab764] text-white px-4 py-2 rounded-lg"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-600 mt-2">
            Error loading category images: {error}
          </p>
        )}
      </div>
    </>
  );
};

export default SidebarWithFoodItems;

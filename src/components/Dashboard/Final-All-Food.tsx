"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter, useParams } from "next/navigation";
import { useLogout, categoryImages, uploadCategoryImage } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";
import { getAllCategory } from "@/queries/category_and_food";
import { allFood, deleteFood } from "@/queries/category_and_food";

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
type FoodCategory = "Select food category" | "All";

type FoodItem = {
  id: number;
  uuid: string;
  name: string;
  category_uuid: string;
  price: number;
  image: string | StaticImport;
  description: string;
  discount: number;
};

const SidebarWithFoodItems: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>(
    "Select food category"
  );

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

  const [categories, setCategories] = useState<any[]>([]); // State to store categories
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        if (response?.data?.categories) {
          setCategories(response.data.categories);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (err) {
        setCategoriesError(
          err instanceof Error ? err.message : "Error fetching categories"
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    if (!vendor?.slug) return;

    const fetchFoodItems = async () => {
      try {
        const foodData = await allFood(vendor.slug);
        console.log(foodData);

        if (foodData?.data?.foods && Array.isArray(foodData.data.foods)) {
          setFoodItems(foodData.data.foods);
        } else {
          throw new Error("Invalid food data structure");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch food data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [vendor?.slug]);

  const handleDeleteFood = async (food_uuid: string) => {
    if (!vendor?.slug) return;

    try {
      await deleteFood(vendor.slug, food_uuid);
      setFoodItems((prevItems) =>
        prevItems.filter((item) => item.uuid !== food_uuid)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete food item"
      );
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value as FoodCategory;
    setSelectedCategory(selectedCategory);
    handleCategoryClick(selectedCategory);
    console.log(selectedCategory);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!vendor) return null;

  return (
    <>
      <div className="flex gap-3">
        {/* Sidebar */}
        {/* <div className="bg-gray-800 text-white md:p-6">
          <h2 className="text-lg font-semibold mb-6 text-black">
            Food Categories
          </h2>
        </div> */}

        {/* Main content area */}
        {/* <div className="flex-1 bg-gray-100">
          <div className="text-black text-md flex justify-end">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-fit text-left p-4 my-2 rounded-lg hover:bg-gray-700"
            >
              <option>All</option>
              {categories.map((category) => {
                const categoryName =
                  typeof category === "string" ? category : category.name;

                const categoryUUID =
                  typeof category === "string" ? category : category.uuid;

                return (
                  <option key={categoryName} value={categoryName}>
                    {categoryName.charAt(0).toUpperCase() +
                      categoryName.slice(1)}{" "}
                    <br />
                    {categoryUUID}
                  </option>
                );
              })}
            </select>
          </div>
        </div> */}

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
              {typeof selectedFood.image === "string" && (
                <div className="flex justify-center">
                  <img
                    src={selectedFood.image}
                    alt={selectedFood.name}
                    className="w-auto h-[200px] object-cover rounded-lg mb-4"
                  />
                </div>
              )}

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
                Price: &#8358; {selectedFood.price.toFixed(2)}
              </p>

              {/* Discount */}
              <p className="text-md font-bold text-gray-900">
                Discount: &#8358; {selectedFood.discount.toFixed(2)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {foodItems.map((food) => (
          <div
            key={food.uuid}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
          >
            {typeof food.image === "string" && (
              <div className="flex justify-center">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-auto h-[200px] object-cover rounded-lg mb-4"
                />
              </div>
            )}
            <h3 className="text-lg font-bold mt-2">{food.name}</h3>
            <p className="text-gray-600">{food.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-green-600">
                &#8358;{food.price.toFixed(2)}
              </span>
              {food.discount > 0 && (
                <span className="text-sm text-red-500">
                  {food.discount}% off
                </span>
              )}
            </div>
            <div className="flex justify-around mt-5">
              <button
                className="text-blue-600"
                onClick={() => handleViewDetails(food)}
              >
                <FaEye size={20} />
              </button>
              <Link href={`/vendor/foods/${food.id}`}>
                <button className="text-green-600">
                  <FaEdit size={20} />
                </button>
              </Link>
              <button
                className="text-[#dc2626]"
                onClick={() => handleDeleteFood(food.uuid)}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SidebarWithFoodItems;

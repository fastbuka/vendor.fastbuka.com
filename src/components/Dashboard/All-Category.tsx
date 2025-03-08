"use client";
import React, { useState, useEffect } from "react";
import Turkey from "/public/turkey.jpg";
import JellofRice from "/public/jollof1.jpg";
import Drinks from "/public/drinks.jpg";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";
import { getAllCategory } from "@/queries/category_and_food";

interface UserProfile {
  profile: {
    first_name: string;
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

const FoodCategory = [
  {
    id: 1,
    name: "Rice",
    total: "5",
    imageSrc: JellofRice,
    alt: "Jellof Rice",
  },
  {
    id: 2,
    name: "Protein (Meat)",
    total: "5",
    imageSrc: Turkey,
    alt: "Turkey",
  },
  {
    id: 3,
    name: "Drinks",
    total: "30",
    imageSrc: Drinks,
    alt: "Drinks",
  },
];

type Params = {
  slug: string;
}

const Category: React.FC = () => {
  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());

  const params = useParams() as Params;  // Type assertion
  const { slug } = params;
  const [vendor, setVendor] = useState<any | null>(null); // State to store vendor details
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

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!vendor) return null;
  return (
    <>
      <div className="">
        <h1>All Category</h1>
        {/* Get all categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
          {categoriesLoading && <p>Loading categories...</p>}
          {categoriesError && (
            <p className="text-red-600">Error: {categoriesError}</p>
          )}

          {categories.map((category: any) => (
            <div
              key={category.uuid}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              {category.image && (
                <div className="relative h-48 w-full mb-4">
                  <Image
                    // src={category.image}
                    src={
                      "https://storage.fastbuka.com/storage/development/images/94jIcSjYmG49MNgj8wudRHXSOQYolid4Ktu4r4in.jpg"
                    }
                    alt={category.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  Created: {new Date(category.created_at).toLocaleDateString()}
                </span>
                <span>Status: {category.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;

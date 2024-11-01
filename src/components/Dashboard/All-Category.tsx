"use client";
import React, { useState, useEffect } from "react";
import Turkey from "/public/turkey.jpg";
import JellofRice from "/public/jollof1.jpg";
import Drinks from "/public/drinks.jpg";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import CardDataStats from "@/components/CardDataStats";
import { useRouter, useParams } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";

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

const Category: React.FC = () => {
  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const { slug } = useParams(); // Get the slug directly from params
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

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!vendor) return null;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {FoodCategory.map((food, index) => (
          <CardDataStats
            key={index}
            name={food.name}
            total={"Total Item " + food.total}
            id={food.id}
          >
            <Image
              src={food.imageSrc}
              alt={food.alt}
              className="img-fluid rounded-full object-cover h-10 w-30"
              width={40} // Adjust the width as needed
              height={40} // Adjust the height as needed
            />
          </CardDataStats>
        ))}
      </div>
    </>
  );
};

export default Category;

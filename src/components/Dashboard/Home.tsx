"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { allAccounts, useLogout } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getDefaultFirstName } from "@/utils/defaults";

interface UserProfile {
  profile: {
    first_name: string;
    email: string;
  };
}

interface Vendor {
  id: number;
  name: string;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  opening_time: string;
  closing_time: string;
  // Add other fields if needed
}

const Home: React.FC = () => {
  // Check for token to authenticate
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);
  const [vendors, setVendors] = useState<Vendor[]>([]); // Store vendors array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null); // Store user data
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (!token || !userData) {
      router.push("/login");
    } else {
      setUser(userData as UserProfile);

      // Use a function expression instead of a declaration
      const fetchData = async () => {
        try {
          const vendorsData = await allAccounts(token);
          setVendors(vendorsData);
        } catch (err) {
          setError("Failed to fetch vendors data");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [router]);

  const handleLogout = () => {
    logout.mutate();
  };

  if (!user) {
    return <div>Testing Loading...</div>;
  }

  return (
    <>
      <h1 className="font-bold text-black text-xl my-3">
        Welcome, {getDefaultFirstName(user.profile?.first_name)}
      </h1>

      <div>
      <h1>Vendors</h1>
      {vendors.length > 0 ? (
        <ul>
          {vendors.map((vendor) => (
            <li key={vendor.id}>
              <h3>{vendor.name}</h3>
              <p>{vendor.description}</p>
              <p>Location: {vendor.city}, {vendor.state}, {vendor.country}</p>
              <p>Address: {vendor.address}</p>
              <p>Opening Time: {vendor.opening_time}</p>
              <p>Closing Time: {vendor.closing_time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vendors available</p>
      )}
    </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8"></div>
      </div>
    </>
  );
};

export default Home;

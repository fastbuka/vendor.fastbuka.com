"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/logo-dark.png";
import { useRouter, useParams } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";
import { useEffect, useState } from "react";
import { Params } from '@/types/params';

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
  state: string;
  city: string;
  address: string;
  status: string;
  opening_time: string;
  closing_time: string;
  balance: string;
  // Add other fields if needed
}

const Profile = () => {
  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const params = useParams() as Params;
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

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!vendor) return null;
  return (
    <>
      <div className="flex justify-center">
        <Image src={Logo} alt="Profile" className="rounded-full" />
      </div>
      {/* <h1 className="text-2xl font-bold text-center mt-3">{vendor.name}</h1> */}

      <div className="mt-5">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black">Vendor Information</h3>
            </div>
            <div className="p-7">
              <form className="form-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={vendor.name}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={vendor.description}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="country"
                  >
                    Country:
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={vendor.country}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="state"
                  >
                    State:
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={vendor.state}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="city"
                  >
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={vendor.city}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="address"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={vendor.address}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="opening_time"
                  >
                    Opening Time:
                  </label>
                  <input
                    type="text"
                    id="opening_time"
                    name="opening_time"
                    value={vendor.opening_time}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="closing_time"
                  >
                    Closing Time:
                  </label>
                  <input
                    type="text"
                    id="closing_time"
                    name="closing_time"
                    value={vendor.closing_time}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="status"
                  >
                    Account Status:
                  </label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={vendor.status}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="balance"
                  >
                    Balance:
                  </label>
                  <input
                    type="number"
                    id="balance"
                    name="balance"
                    value={vendor.balance}
                    className="w-full rounded border border-stroke bg-gray p-5 text-black focus:border-primary focus-visible:outline-none "
                  />
                </div>
              </form>
              <div className="flex justify-end">
                <Link href={`/vendor/edit-profile/${vendor.slug}`}>
                  <button
                    type="submit"
                    className="btn btn-primary bg-indigo-400 text-white p-2 rounded-2xl"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

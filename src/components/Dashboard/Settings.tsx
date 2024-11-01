"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FaRegUserCircle } from "react-icons/fa";
import { BsEnvelopeAt } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
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

const Settings = () => {
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
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-stroke px-7 py-4">
              <h3 className="font-medium text-black">Personal Information</h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <FaRegUserCircle />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Devid Jhon"
                        defaultValue="Devid Jhon"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none "
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="+990 3343 7865"
                      defaultValue="+990 3343 7865"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <BsEnvelopeAt />
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none "
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="devidjond45@gmail.com"
                      defaultValue="devidjond45@gmail.com"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black "
                    htmlFor="Username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none"
                    type="text"
                    name="Username"
                    id="Username"
                    placeholder="devidjhon24"
                    defaultValue="devidjhon24"
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black "
                    htmlFor="Username"
                  >
                    BIO
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <AiFillEdit />
                    </span>

                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                      name="bio"
                      id="bio"
                      rows={6}
                      placeholder="Write your bio here"
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2 bg-light">
          <div className="rounded-sm ">
            <div className="border-b border-stroke px-7 bg-white py-4">
              <h3 className="font-medium text-black">Settings</h3>
            </div>
            <div className="border-b border-stroke px-7 bg-white py-4 my-3 rounded-xl shadow shadow-lg">
              <Link href="#">
                <h3 className="font-medium text-black">Preference</h3>
              </Link>
            </div>
            <div className="border-b border-stroke px-7 bg-white py-4 my-3 rounded-xl shadow shadow-lg">
              <Link href="#">
                <h3 className="font-medium text-black">Help Center</h3>
              </Link>
            </div>
            <div className="border-b border-stroke px-7 bg-white py-4 my-3 rounded-xl shadow shadow-lg">
              <Link href="#">
                <h3 className="font-medium text-black">Provide FeedBack</h3>
              </Link>
            </div>
            <div className="border-b border-stroke px-7 bg-white py-4 my-3 rounded-xl shadow shadow-lg">
              <Link href="#">
                <h3 className="font-medium text-black">Vendor Support</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nigeria from "/public/nigeria2.png";
import XLM from "/public/xlm.png";
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

// Add near other interfaces
type Params = {
  slug: string;
}

const AddAccount = () => {
  // State to track selected currency
  const [selectedCurrency, setSelectedCurrency] = useState<string>("NGN");

  // Handle the change of the radio input
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(e.target.value);
  };

      // vendor slug
      const router = useRouter();
      const [user, setUser] = useState<UserProfile | null>(null);
      const [queryClient] = useState(() => new QueryClient());
      const logout = useLogout(queryClient);
    
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
    
      if (!user) {
        return <div>Loading...</div>;
      }
      
      if (!vendor) return null;

  return (
    <div className="w-full mx-auto">
      <div className="grid md:grid-cols-2 gap-5 md:gap-10">
        {/* Nigeria Naira Radio Button */}
        <div className="bg-white p-3 rounded-xl shadow shadow-dark font-medium my-3">
          <label className="flex items-center gap-5 p-3 rounded-xl cursor-pointer">
            <input
              type="radio"
              name="currency"
              value="NGN"
              checked={selectedCurrency === "NGN"}
              onChange={handleCurrencyChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="flex items-center gap-5">
              <Image
                src={Nigeria}
                width={50}
                height={50}
                alt="Nigeria Icon"
                className="rounded-xl"
              />
              <div>
                <span className="font-bold">Nigeria Naira</span> <br />
                <span>NGN</span>
              </div>
            </span>
          </label>
        </div>

        {/* Stellar Radio Button */}
        <div className="bg-white p-3 rounded-xl shadow shadow-dark font-medium my-3">
          <label className="flex items-center gap-5 p-3 rounded-xl cursor-pointer">
            <input
              type="radio"
              name="currency"
              value="NGNC"
              checked={selectedCurrency === "NGNC"}
              onChange={handleCurrencyChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="flex items-center gap-5">
              <Image
                src={XLM}
                width={50}
                height={50}
                alt="Stellar Icon"
                className="rounded-xl"
              />
              <div>
                <span className="font-bold">Stellar</span> <br />
                <span>NGNC</span>
              </div>
            </span>
          </label>
        </div>
      </div>

      {/* Conditional Rendering of Forms based on Selected Currency */}
      <div className="mt-6">
        {selectedCurrency === "NGN" && (
          <div className="p-4 bg-white shadow rounded-lg">
            {/* Nigeria Naira form content */}
            <h3 className="text-lg font-bold">Add Naira Account</h3>
            <form className="">
              <div className="mb-3">
                <label
                  htmlFor="bank_account"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Bank Account:
                </label>
                <select
                  id="bank_account"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="bank_account"
                >
                  <option selected>Choose a bank</option>
                  <option value="US">Access Bank</option>
                  <option value="CA">Opay</option>
                  <option value="FR">UBA</option>
                  <option value="DE">Palmpay</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="account_number"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Account Number:
                </label>
                <input
                  type="number"
                  min="5000"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="account_number"
                  name="account_number"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="account_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Account Name:
                </label>
                <input
                  type="number"
                  min="5000"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="account_name"
                  name="account_name"
                  readOnly
                />
              </div>
              <button
                type="submit"
                className="text-white bg-[#3ab764] border border-[#3ab764] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#3ab764] duration-300 hover:drop-shadow-2xl mt-5"
              >
                Next
              </button>{" "}
            </form>
          </div>
        )}

        {selectedCurrency === "NGNC" && (
          <div className="p-4 bg-white shadow rounded-lg">
            {/* Stellar form content */}
            <h3 className="text-lg font-bold">Add Stellar Wallet</h3>
            <form className="">
              <div className="mb-3">
                <label
                  htmlFor="account_number"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Wallet Address:
                </label>
                <input
                  type="text"
                  min="5000"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="account_number"
                  name="account_number"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-[#3ab764] border border-[#3ab764] font-semibold rounded-full text-sm px-9 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#3ab764] duration-300 hover:drop-shadow-2xl mt-5"
              >
                Next
              </button>{" "}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAccount;

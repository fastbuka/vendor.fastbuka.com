"use client";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { User } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { TbSettingsCog } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { useRouter, useParams } from "next/navigation";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";
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
  city: string;
  // Add other fields if needed
}

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());

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

  const handleLogout = () => {
    // Clear authentication-related data from localStorage
    localStorage.removeItem("fastbuka_auth_token");
    localStorage.removeItem("user_data");

    // Redirect the user to the login page
    router.push("/login");
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
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black ">
            {vendor.name}
          </span>
          {/* <span className="block text-xs">UX Designer</span> */}
        </span>

        <span className="h-auto w-auto rounded-full">
          <User className="border rounded-full" />
        </span>

        <BsChevronDown />
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5">
            <li>
              <Link
                href={"/vendor/profile/"+ vendor.slug}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FaRegUserCircle />
                My Profile
              </Link>
            </li>
            {/* <li>
              <Link
                href={"/vendor/settings/" + vendor.slug}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <TbSettingsCog />
                Account Settings
              </Link>
            </li> */}
            <li>
              <Link
                href="/vendor/home"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <AiOutlineDashboard />
                Account Center
              </Link>
            </li>
          </ul>
          <button
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            onClick={handleLogout}
          >
            <BiLogOutCircle />
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;

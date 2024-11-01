"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import Logo from "/public/logo.png";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineFoodBank } from "react-icons/md";
import { BsCollection } from "react-icons/bs";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { BsDiagram3 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { TbSettingsCog } from "react-icons/tb";
import { TbPresentationAnalytics } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
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

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useState("dashboard");

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
  if (loading) return <div>Loading vendor details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!vendor) return <div>No vendor found</div>;

  const menuGroups =  [
    {
      name: "MENU",
      menuItems: [
        {
          icon: <RxDashboard />,
          label: "Dashboard",
          route: `/vendor/dashboard/${vendor.slug}`,
        },

        {
          icon: <MdOutlineFoodBank />,
          label: "Items",
          route: "#",
          children: [
            { label: "Items", route: "/vendor/foods" },
            { label: "Add New Item", route: "/vendor/foods/add-food" },
          ],
        },

        {
          icon: <BsCollection />,
          label: "Item Categories",
          route: "#",
          children: [
            { label: "Item Category", route: "/vendor/category" },
            {
              label: "Add New Category",
              route: "/vendor/category/add-category",
            },
          ],
        },

        {
          icon: <LiaCartArrowDownSolid />,
          label: "Orders",
          route: "/vendor/order",
        },

        {
          icon: <BsDiagram3 />,
          label: "Ordered Items",
          route: "/vendor/order-item",
        },
      ],
    },

    {
      name: "SETTINGS",
      menuItems: [
        {
          icon: <FaRegUserCircle />,
          label: "Profile",
          route: "/vendor/profile",
        },

        {
          icon: <GiWallet />,
          label: "Wallet",
          route: "/vendor/wallet",
        },

        {
          icon: <TbSettingsCog />,
          label: "Account Settings",
          route: "/vendor/settings",
        },

        {
          icon: <AiOutlineDashboard />,
          label: "Account Center",
          route: "/vendor/home",
        },

        {
          icon: <TbPresentationAnalytics />,
          label: "Sales Analysis",
          route: "/vendor/sales",
        },

        {
          icon: <BiLogOutCircle />,
          label: "Logout",
          route: "#",
        },
      ],
    },
  ];

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#3ab764] duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href={vendor.slug}>
            <Image width={70} height={50} src={Logo} alt="Logo" priority />
          </Link>

          {/* <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button> */}
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-4 py-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";
import { fetchOrders } from "@/queries/category_and_food";

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

type Orders = {
  id: number;
  uuid: string;
  order_number: string;
  total_amount: string;
  discount_amount: string;
  paid_amount: string;
  delivery_address: string;
  payment_method: string;
  payment_status: string;
  delivery_charges: string;
  delivery_contact: string;
  delivery_email: string;
  orderItems: {
    price: string;
    food: {
      name: string;
      description: string;
      image: string;
      price: string;
      discount: 0;
      processing_time: string;
    }
  }
  user: {
    email: string;
    contact: string;
    username: string;
  }
};

const Order = () => {
  const data = [
    { id: 1, name: "Burger", category: "Food", price: 10.99 },
    { id: 2, name: "Pizza", category: "Food", price: 8.99 },
    { id: 3, name: "Coke", category: "Drink", price: 1.99 },
    { id: 4, name: "Fries", category: "Food", price: 2.99 },
    { id: 5, name: "Salad", category: "Food", price: 5.99 },
    // Add more data as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

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

    const [orders, setOrders] = useState<Orders[]>([]);

    useEffect(() => {
      if (!vendor?.slug) return;
  
      const fetchOrderItems = async () => {
        try {
          const orderFoods = await fetchOrders(vendor.uuid);
  
          if (orderFoods?.data?.orders && Array.isArray(orderFoods.data.orders)) {
            setOrders(orderFoods.data.orders);
          } else {
            throw new Error("Invalid Order data structure");
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch Order data"
          );
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrderItems();
    }, [vendor?.slug]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!vendor) return null;

  return (
    <>
      <div className="w-full">
        <div className="flex gap-5 items-center md:justify-between">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search......"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 md:p-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/*Data Per Page */}
          <div className="mb-4">
            <label className="mr-2 text-gray-700">Entries per page:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="grid">
  <div className="overflow-x-auto shadow-lg rounded-lg border border-[#3ab764]">
    <table className="min-w-full md:w-full bg-white rounded-lg">
      <thead className="bg-gray-50">
        <tr className="text-left text-gray-600 text-sm font-semibold">
          <th className="py-4 px-6">Customer Name</th>
          <th className="py-4 px-6">Order Number</th>
          <th className="py-4 px-6">Items</th>
          <th className="py-4 px-6">Price</th>
          <th className="py-4 px-6">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr
            key={order.id}
            className={`border-b ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100`}
          >
            <td className="py-4 px-6">{order.user.email}</td>
            <td className="py-4 px-6">{order.order_number}</td>
            <td className="py-4 px-6">
                {order?.orderItems?.map((item: { food: { name: string } }) => item.food.name).join(", ")}
            </td>
            <td className="py-4 px-6">
              {order?.orderItems?.map((item) => item.price.toFixed(2)).join(", ")}
            </td>
            <td className="py-4 px-6">
              {order.orderItems.map((item) => item.quantity).join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        <div className="flex gap-5 items-center md:justify-between">
          {/* Showing Entries Info */}
          <div className="mt-4">
            <p className="text-gray-700">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav>
              <ul className="inline-flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
                      } shadow-md`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;

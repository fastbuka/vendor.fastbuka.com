'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLogout } from '@/queries/auth';
import { QueryClient } from 'react-query';
import { getUser, getToken } from '@/utils/token';
import { getDefaultFirstName } from '@/utils/defaults';
import Link from 'next/link';
import Image from 'next/image';
import Pay from '/public/pay.png';
import Order from '/public/order.png';
import FoodAnalysis from '@/components/Charts/ChartThree';
import MonthlyOverview from '@/components/Charts/ChartTwo';
import { getVendorBySlug } from '@/utils/token';
import { useOrder } from '@/hooks/order';

interface UserProfile {
  profile: {
    first_name: string;
    user_uuid: string;
    email: string;
  };
}

interface Order {
  id: string;
  uuid: string;
  user_uuid: string;
  vendor_uuid: string;
  order_number: string;
  total_amount: number;
  discount_amount: number;
  paid_amount: number;
  delivery_address: string | null;
  delivery_name: string;
  order_status: string;
}

type Params = {
  slug: string;
};

const orderStatuses = ['', 'paid', 'ReadyForPickup', 'PickedUp', 'Delivered'];

const VendorDashboard = () => {
  const router = useRouter();
  const params = useParams() as Params;
  const { slug } = params;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [vendor, setVendor] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderStatus, setOrderStatus] = useState(orderStatuses[0]);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);
  const { orders } = useOrder();

  const fetchVendor = async (slug: string) => {
    try {
      const response = await getVendorBySlug(slug);
      if (response?.data?.vendor) {
        setVendor(response.data.vendor);
      } else {
        throw new Error('Vendor not found');
      }
    } catch (err) {
      setError('Failed to fetch vendor details');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await orders({ order_status: orderStatus });
      if (response.success) {
        setOrderDetails(response.data.orders);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, [orders, orderStatus]);

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(userData as UserProfile);
    }

    if (slug) {
      fetchVendor(slug);
    }
  }, [slug, router]);

  useEffect(() => {
    fetchOrders();
  }, [orderStatus]);

  const filteredData = orderDetails.filter((item) =>
    item.order_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!user || !vendor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="font-bold text-black text-xl my-3">
        Welcome, {getDefaultFirstName(vendor.name)}
      </h1>
      <div className="grid text-black grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <Link href={`/vendor/withdrawal/${vendor.slug}`}>
            <div className="p-3">
              <Image src={Pay} alt="deposit" />
              <h1 className="font-medium text-xl mt-1">Withdrawal</h1>
            </div>
          </Link>
        </div>
        <div className="bg-[#f2f9ff] h-fit border border-[#ddeeff] rounded-xl">
          <Link href={`/vendor/order/${vendor.slug}`}>
            <div className="p-3">
              <Image src={Order} alt="swap" />
              <h1 className="font-medium text-xl mt-1">Pending Orders</h1>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5 mt-5">
        <div>
          <MonthlyOverview />
        </div>
        <div>
          <FoodAnalysis />
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-xl text-black font-bold my-5">Order History</h1>
        <div className="flex gap-5 items-center md:justify-between flex-wrap">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search......"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 md:p-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex md:items-center md:justify-center md:gap-4 gap-2 flex-wrap md:mb-0 mb-3">
            {orderStatuses.map((status, index) => (
              <Link
                href={`/vendor/order/${vendor.slug}/?status=${status}`}
                key={index}
                onClick={() => setOrderStatus(status)}
                className={`px-4 py-2 rounded-lg border ${
                  orderStatus === status
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'
                } shadow-md`}
              >
                {status || 'All'}
              </Link>
            ))}
          </div>
          {/* <div className="mb-4">
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
          </div> */}
        </div>

        <div className="grid g_table w-full overflow-x-auto">
          <div className="overflow-x-auto shadow-lg rounded-lg border border-[#3ab764] w-full">
            <table className="w-full bg-white rounded-lg">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-sm font-semibold">
                  <th className="py-4 px-6">Delivery Name</th>
                  <th className="py-4 px-6">Address</th>
                  <th className="py-4 px-6">Discount</th>
                  <th className="py-4 px-6">Order Number</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100`}
                  >
                    <td className="py-4 px-6">{item.delivery_name}</td>
                    <td className="py-4 px-6">{item.delivery_address}</td>
                    <td className="py-4 px-6">{item.discount_amount}</td>
                    <td className="py-4 px-6">{item.order_number}</td>
                    <td className="py-4 px-6">{item.paid_amount}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.order_status.toLowerCase() === 'paid'
                            ? 'bg-blue-100 text-blue-800'
                            : item.order_status.toLowerCase() ===
                                'readyforpickup'
                              ? 'bg-yellow-100 text-yellow-800'
                              : item.order_status.toLowerCase() === 'pickedup'
                                ? 'bg-green-100 text-green-800'
                                : item.order_status.toLowerCase() ===
                                    'delivered'
                                  ? 'bg-purple-100 text-purple-800'
                                  : item.order_status.toLowerCase() ===
                                      'pending'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.order_status.toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-5 items-center md:justify-between">
          <div className="mt-4">
            <p className="text-gray-700">
              Showing {indexOfFirstItem + 1} to{' '}
              {Math.min(indexOfLastItem, filteredData.length)} of{' '}
              {filteredData.length} entries
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <nav>
              <ul className="inline-flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === index + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'
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

export default VendorDashboard;

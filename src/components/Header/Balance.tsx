'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { BiShowAlt } from 'react-icons/bi';
import { useRouter, useParams } from 'next/navigation';
import { useLogout } from '@/queries/auth';
import { QueryClient } from 'react-query';
import { getUser, getToken } from '@/utils/token';
import { getVendorBySlug } from '@/utils/token';
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
  balance: string;
  // Add other fields if needed
}

const Balance = () => {
  const [balance, setBalance] = useState(false);
  const toggleBalance = () => {
    setBalance(!balance);
  };

  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const params = useParams() as Params;
  const { slug } = params;
  const [vendor, setVendor] = useState<Vendor | null>(null); // State to store vendor details
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
        throw new Error('Vendor not found');
      }
    } catch (err) {
      setError('Failed to fetch vendor details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push('/login');
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
      <div className="flex">
        <button type="button" onClick={toggleBalance}>
          {balance ? <BiShowAlt size="26px" /> : <BiHide size="26px" />}
        </button>
        <div className="grid grid-cols-3 gap-10">
          <div className="flex items-center justify-center ">
            <h1 className="font-mono font-black text-sm 2xl:text-lg ms-2">
              Total Balance:{' '}
            </h1>
            <input
              type={balance ? 'password' : 'text'}
              id="password"
              name="password"
              value={vendor?.balance}
              className="font-mono font-black text-sm 2xl:text-xl ms-2 block w-1/2 bg-white"
              disabled
            />
          </div>
          {/* <div className="flex items-center justify-center border-l-2 border-[#3ab764] ">
            <h1 className="font-mono font-black text-sm 2xl:text-xl ms-2">
              NGN:{" "}
            </h1>
            <input
              type={balance ? "password" : "text"}
              id="password"
              name="password"
              value="1,900,000"
              className="font-mono font-black text-sm 2xl:text-xl ms-2 block w-1/2 bg-white"
              placeholder="Password"
              required
              disabled
            />
          </div>
          <div className="flex items-center justify-center border-l-2 border-[#3ab764] mx-auto">
            <h1 className="font-mono font-black text-sm 2xl:text-xl ms-2">
              NGNC:{" "}
            </h1>
            <input
              type={balance ? "password" : "text"}
              id="password"
              name="password"
              value="1,900,000"
              className="font-mono font-black text-sm 2xl:text-xl ms-2 block w-1/2 bg-white"
              placeholder="Password"
              required
              disabled
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Balance;

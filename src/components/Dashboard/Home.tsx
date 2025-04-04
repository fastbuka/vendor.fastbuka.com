'use client';
import React from 'react';
import Link from 'next/link';
import VendorCard from '@/components/VendorCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { allAccounts } from '@/queries/auth';
import { QueryClient } from 'react-query';
import { getUser, getToken } from '@/utils/token';
import { getDefaultFirstName } from '@/utils/defaults';
import Image from 'next/image';
import { GoPlus } from 'react-icons/go';

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

const Home: React.FC = () => {
  // Check for token to authenticate
  const [queryClient] = useState(() => new QueryClient());
  const [vendors, setVendors] = useState<Vendor[]>([]); // Store vendors array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null); // Store user data
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication-related data from localStorage
    localStorage.removeItem('fastbuka_auth_token');
    localStorage.removeItem('user_data');

    // Redirect the user to the login page
    router.push('/login');
  };

  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(userData as UserProfile);

      // Use a function expression instead of a declaration
      const fetchData = async () => {
        try {
          const vendorsData = await allAccounts(token);
          setVendors(vendorsData);
        } catch (err) {
          setError('Failed to fetch vendors data');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [router]);

  if (!user) {
    return <div>Testing Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full md:px-[160px] px-10 h-[100px] flex items-center justify-center">
        <div className="w-full flex items-center justify-between">
          <Image
            src="/logo-dark.png"
            alt="Fastbuka Logo"
            width={131}
            height={43}
          />
          <Link target="_blank" href="https://vendor.fastbuka.com/register">
            <button className="w-[113px] h-[52px] rounded-lg bg-[#0A9A66] text-white text-base">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full md:px-[160px] px-10 flex flex-col gap-8 relative mt-8">
        <Image
          width={121}
          height={161}
          src="/rightIllustration.png"
          alt=""
          className="absolute right-15 top-5 md:flex hidden"
        />
        <Image
          width={121}
          height={161}
          src="/leftIllustration.png"
          alt=""
          className="absolute left-15 top-5 md:flex hidden"
        />
        <Image
          width={121}
          height={161}
          src="/topIllustration.png"
          alt=""
          className="absolute left-1/2 transform -translate-x-1/2 -top-7 md:flex hidden"
        />

        <h1 className="md:text-5xl text-3xl text-center font-bold">
          Select a <span className="text-[#0A9A66]">Store</span> to Manage
        </h1>
        {vendors.length === 0 ? (
          <p className="text-center text-gray-500">No vendors available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <VendorCard
                ratings={4.5}
                is_online={false}
                key={vendor.slug}
                {...vendor}
              />
            ))}
          </div>
        )}
        <Link target="_blank" href="https://vendor.fastbuka.com/register">
          <div className="mt-4 w-full h-[70px] border border-dotted rounded-lg flex items-center justify-center md:text-2xl text-xl font-bold gap-4">
            <p>Add Store</p>
            <GoPlus size={25} className="font-bold" />
          </div>
        </Link>
      </div>
      <footer>
        <p className="text-center text-xl font-mono font-bold my-10">
          FastBuka &copy; 2025 All Right Reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;

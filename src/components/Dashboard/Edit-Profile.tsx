'use client';

import { useRouter, useParams } from 'next/navigation';
import { useLogout } from '@/queries/auth';
import { QueryClient } from 'react-query';
import { getUser, getToken, getVendorBySlug } from '@/utils/token';
import { useEffect, useState, FormEvent } from 'react';
import { useUpdateProfile } from '@/queries/auth';
import { Params } from '@/types/params';
import { useToast } from '@/hooks/use-toast';

// Function to convert "10:00 PM" to "22:00"
const convertTo24HourFormat = (time: string): string => {
  if (!time) return '';

  const [timePart, period] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);

  if (period?.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period?.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const Profile = () => {
  const router = useRouter();
  const params = useParams() as Params;
  const { slug } = params;
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const [vendor, setVendor] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { mutate: updateProfile } = useUpdateProfile();
  const { toast } = useToast();

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    if (slug) {
      fetchVendor(slug);
    }
  }, [slug, router]);

  const fetchVendor = async (slug: string) => {
    try {
      setLoading(true);
      const response = await getVendorBySlug(slug);

      console.log('API Response:', response); // Debugging the response

      if (response?.data?.vendor && typeof response.data.vendor === 'object') {
        setVendor({
          ...response.data.vendor,
          opening_time: convertTo24HourFormat(
            response.data.vendor.opening_time
          ),
          closing_time: convertTo24HourFormat(
            response.data.vendor.closing_time
          ),
        });
      } else {
        setVendor(null);
        throw new Error('Vendor data is invalid');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Failed to fetch vendor details');
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    if (!vendor) return;

    updateProfile(
      {
        uuid: vendor?.uuid ?? '',
        name: vendor?.name ?? '',
        description: vendor?.description ?? '',
        country: vendor?.country ?? '',
        state: vendor?.state ?? '',
        city: vendor?.city ?? '',
        address: vendor?.address ?? '',
        opening_time: vendor?.opening_time ?? '',
        closing_time: vendor?.closing_time ?? '',
      },
      {
        onSuccess: (response) => {
          toast({
            variant: 'success',
            title: 'Profile updated successfully',
            description: response?.message || 'Your profile has been updated.',
          });
        },
        onError: () => {
          toast({
            // variant: 'error',

            title: 'Update failed',
            description: 'Please try again.',
          });
        },
      }
    );
  };

  return (
    <div className="md:container mx-auto md:w-3/4 px-5">
      {loading ? (
        <p className="text-center text-gray-500">Loading vendor details...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : !vendor ? (
        <p className="text-center text-gray-500">No vendor data available.</p>
      ) : (
        <form onSubmit={submitForm}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 mt-5">
            {/* Restaurant Name */}
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium text-black">
                Restaurant Name:
              </label>
              <input
                type="text"
                value={vendor?.name ?? ''}
                onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
                className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
                placeholder="Restaurant Name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium text-black">
                Description:
              </label>
              <input
                type="text"
                value={vendor?.description ?? ''}
                onChange={(e) =>
                  setVendor({ ...vendor, description: e.target.value })
                }
                className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
                placeholder="Description"
                required
              />
            </div>

            {/* Country */}
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium text-black">
                Country:
              </label>
              <select
                value={vendor?.country ?? ''}
                onChange={(e) =>
                  setVendor({ ...vendor, country: e.target.value })
                }
                className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
                required
              >
                <option value="">Choose your Country</option>
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>

            {/* Address */}
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium text-black">
                Address:
              </label>
              <input
                type="text"
                value={vendor?.address ?? ''}
                onChange={(e) =>
                  setVendor({ ...vendor, address: e.target.value })
                }
                className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
                placeholder="Enter address"
                required
              />
            </div>

            {/* Opening Time */}
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium text-black">
                Opening Time:
              </label>
              <input
                type="time"
                value={vendor?.opening_time ?? ''}
                onChange={(e) =>
                  setVendor({ ...vendor, opening_time: e.target.value })
                }
                className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
                required
              />
            </div>

            {/* Closing Time */}
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium text-black">
                Closing Time:
              </label>
              <input
                type="time"
                value={vendor?.closing_time ?? ''}
                onChange={(e) =>
                  setVendor({ ...vendor, closing_time: e.target.value })
                }
                className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-green-600 border border-green-600 font-semibold rounded-full text-sm px-10 py-3 transition hover:bg-white hover:text-green-600"
          >
            Update Vendor
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;

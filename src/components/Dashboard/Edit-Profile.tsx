"use client";

import { useRouter, useParams } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken, getVendorBySlug } from "@/utils/token";
import { useEffect, useState, FormEvent } from "react";
import { NIGERIA_STATE_WITH_CITY } from "@/constants";
import { useUpdateProfile } from "@/queries/auth";
import { Params } from '@/types/params';

const Profile = () => {
  const router = useRouter();
  const params = useParams() as Params;
  const { slug } = params;
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const [vendor, setVendor] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [opening_time, setOpeningTime] = useState<string>("");
  const [closing_time, setClosingTime] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const { mutate: updateProfile } = useUpdateProfile();
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push("/login");
    }
    if (slug) {
      fetchVendor(slug as string);
    }
  }, [slug, router]);

  const fetchVendor = async (slug: string) => {
    try {
      const response = await getVendorBySlug(slug);
      if (response?.data?.vendor) {
        setVendor(response.data.vendor);
        setUuid(response.data.vendor.uuid);
        setName(response.data.vendor.name);
        setDescription(response.data.vendor.description);
        setCountry(response.data.vendor.country);
        setState(response.data.vendor.state);
        setCity(response.data.vendor.city);
        setAddress(response.data.vendor.address);
        setOpeningTime(response.data.vendor.opening_time);
        setClosingTime(response.data.vendor.closing_time);
      } else {
        throw new Error("Vendor not found");
      }
    } catch (err) {
      setError("Failed to fetch vendor details");
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    updateProfile(
      {
        uuid, // Ensure UUID is included
        name,
        description,
        country,
        state,
        city,
        address,
        opening_time,
        closing_time,
      },
      {
        onSuccess: () => {
          router.push("/vendor/home");
        },
        onError: () => {
          setUpdateError("Update failed. Please try again.");
        },
      }
    );
  };

  return (
    <form onSubmit={submitForm} className="md:container mx-auto md:w-3/4 px-5">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 mt-5">
        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-black">Restaurant Name:</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
            placeholder="Restaurant Name"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-black">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
            placeholder="Description"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-black">Country:</label>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
            required
          >
            <option value="">Choose your Country</option>
            <option value="Nigeria">Nigeria</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-black">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
            placeholder="Enter address"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-black">Opening Time:</label>
          <input
            type="time"
            value={opening_time}
            onChange={(event) => setOpeningTime(event.target.value)}
            className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-black">Closing Time:</label>
          <input
            type="time"
            value={closing_time}
            onChange={(event) => setClosingTime(event.target.value)}
            className="bg-white border border-black text-black text-sm rounded-full block w-full p-3"
            required
          />
        </div>
      </div>

      <button type="submit" className="text-white bg-green-600 border border-green-600 font-semibold rounded-full text-sm px-10 py-3 transition hover:bg-white hover:text-green-600">
        Update Vendor
      </button>
    </form>
  );
};

export default Profile;

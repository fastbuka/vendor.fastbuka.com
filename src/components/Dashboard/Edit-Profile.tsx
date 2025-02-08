"use client";
import { useRouter, useParams } from "next/navigation";
import { useLogout } from "@/queries/auth";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";
import { useEffect, useState, FormEvent } from "react";
import { NIGERIA_STATE_WITH_CITY } from "@/constants";
import { useRegister } from "@/queries/auth";

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

const Profile = () => {
  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const { slug } = useParams(); // Get the slug directly from params
  const [vendor, setVendor] = useState<any | null>(null); // State to store vendor details
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [opening_time, setOpeningTime] = useState<string>("");
  const [closing_time, setClosingTime] = useState<string>("");
  const { mutate: register } = useRegister();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setState(state);
    setCity(""); // Reset city when the state changes
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };

  const cities =
    NIGERIA_STATE_WITH_CITY.find((s) => s.state === state)?.city || [];

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    register(
      {
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
          setRegisterError(
            "Registration failed. Please check your credentials and try again."
          );
        },
      }
    );
  };

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
      <form
        onSubmit={submitForm}
        className="md:container mx-auto md:w-3/4 px-5 "
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 mt-5">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-lg font-medium text-[#000000]"
            >
              Restaurant Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target?.value)}
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-[#000000]"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-lg font-medium text-[#000000]"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target?.value)}
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-[#000000]"
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="country"
              className="block mb-2 text-lg font-medium text-[#000000]"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={country}
              onChange={(event) => setCountry(event.target?.value)}
              autoComplete="country-name"
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-gray-500"
              required
            >
              <option value="">Choose your Country</option>
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="state"
              className="block mb-2 text-lg font-semibold text-[#000000]"
            >
              Select State
            </label>
            <select
              id="state"
              value={state}
              onChange={handleStateChange}
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-[#000000]"
            >
              <option value="">Choose a state</option>
              {NIGERIA_STATE_WITH_CITY.map((stateData) => (
                <option key={stateData.state} value={stateData.state}>
                  {stateData.state}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="mb-6">
            <label
              htmlFor="city"
              className="block mb-2 text-lg font-semibold text-[#000000]"
            >
              Select City
            </label>
            <select
              id="city"
              value={city}
              onChange={handleCityChange}
              disabled={!state} // Disable if no state is selected
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-[#000000]"
            >
              <option value="">Choose a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block mb-2 text-lg font-medium text-[#000000]"
            >
              Store Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target?.value)}
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-[#000000]"
              placeholder="Store address"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="opening_time"
              className="block mb-2 text-lg font-medium text-[#000000]"
            >
              Opening Time
            </label>
            <input
              type="text"
              id="opening_time"
              name="opening_time"
              value={opening_time}
              onChange={(event) => setOpeningTime(event.target?.value)}
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-[#000000]"
              placeholder="Opening Time"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="closing_time"
              className="block mb-2 text-lg font-medium text-[#000000]"
            >
              Closing Time
            </label>
            <input
              type="text"
              id="closing_time"
              name="closing_time"
              value={closing_time}
              onChange={(event) => setClosingTime(event.target?.value)}
              className="bg-white border border-black text-[#000000] text-sm rounded-full block w-full p-3 placeholder-[#000000]"
              placeholder="Closing Time"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-[#3ab764] border border-[#3ab764] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#3ab764] duration-300 hover:drop-shadow-2xl"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Profile;

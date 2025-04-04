'use client';

import { useState, FormEvent, useEffect } from 'react';
import Section from '/public/Section.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/queries/auth';
import { QueryClient } from 'react-query';
import { getUser, getToken } from '@/utils/token';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { NIGERIA_STATE_WITH_CITY } from '@/constants';
import { useRegister } from '@/queries/auth';
import { IoArrowBackOutline } from 'react-icons/io5';

interface UserProfile {
  profile: {
    first_name: string;
  };
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [opening_time, setOpeningTime] = useState<string>('');
  const [closing_time, setClosingTime] = useState<string>('');
  const { mutate: register } = useRegister();
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setState(state);
    setCity(''); // Reset city when the state changes
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };

  // Check for token to authenticate
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(userData as UserProfile);
    }
  }, [router]);

  const handleLogout = () => {
    logout.mutate();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
          router.push('/vendor/home');
        },
        onError: () => {
          setRegisterError(
            'Registration failed. Please check your credentials and try again.'
          );
        },
      }
    );
  };

  return (
    <div>
      <div>
        <Image alt="" src={Section} className="img-fluid md:block" />
        <div className="flex items-center gap-4 my-6 container mx-auto md:w-3/4 px-5">
          <button onClick={() => window.history.back()}>
            <IoArrowBackOutline size={35} />
          </button>
          <h1 className="text-3xl font-bold text-green-600 ">
            We&apos;ll help you set up an account in less than a minute
          </h1>
        </div>

        {registerError && (
          <Alert
            variant="destructive"
            className="mb-4 container mx-auto md:w-3/4 px-5"
          >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertDescription>{registerError}</AlertDescription>
          </Alert>
        )}

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

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 font-semibold">
            Login
          </a>
        </p>
      </div>
      <footer>
        <p className="text-center text-xl font-mono font-bold my-10">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
    </div>
  );
};

export default Register;

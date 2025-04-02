'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoginImg from '/public/illustration.svg';
import { BiHide } from 'react-icons/bi';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useLogin } from '@/queries/auth';
import { BiShowAlt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isLoading } = useLogin();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          router.push('/vendor/home');
        },
        onError: () => {
          setLoginError(
            'Login failed. Please check your credentials and try again.'
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg flex items-center">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 pr-0 md:pr-8">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-4">Enter your login details below</p>

          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                placeholder="name@gmail.com"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
              >
                Password
              </label>
              <div className="flex bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-2 placeholder-gray-500">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 focus:outline-none"
                  placeholder="Password"
                  required
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <BiShowAlt size="26px" />
                  ) : (
                    <BiHide size="26px" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading} // Use isLoading instead of loading
              className="text-white bg-[#3ab764] border border-[#3ab764] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#3ab764] duration-300 hover:drop-shadow-2xl"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-green-600 font-semibold">
              Create an account
            </a>
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 hidden md:block">
          <Image
            src={LoginImg}
            alt="FastBuka"
            className="rounded-lg w-full"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Section from '../../../public/images/homepage/Section.png'
import login from '../../../public/images/homepage/login.png'
import {sendOTPtoMail, verifyOTP} from '@/lib/api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [viewVer, setViewVer] = useState<boolean>(false)
  const [OTP, setOTP] = useState<string[]>(Array(4).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleOTPChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOTP = [...OTP];
      newOTP[index] = value;
  
      setOTP(prevOTP => {
        const updatedOTP = [...prevOTP];
        updatedOTP[index] = value;
        return updatedOTP;
      });
  
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleVerifyEmail = async () => {
    try{
        await sendOTPtoMail(email)
        setViewVer(true)
    }catch(error){
      console.error("failed to verify email: ", error);

    }
    
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }


  useEffect(() => {
    const fullOTP = OTP.join('');
    if (fullOTP.length === 4 && OTP.every(digit => digit !== '')) {
      handleSubmitOTP();
    }
  }, [OTP]);

  const handleSubmitOTP = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    const fullOTP = OTP.join('');
    console.log("full OTP: ", fullOTP);
    try {
      const response = await verifyOTP(fullOTP, email);

      if (!response.ok) {
        throw new Error('OTP verification failed');
      }

    } catch (error) {
      console.error('Could not verify OTP:', error);
    }
  };
  


  return (
    <div>
      <div className="bg-[]"></div>
      {viewVer && (
        <section className="fixed w-full h-full bg-transparent z-99 flex items-center justify-center">
            <div className='w-5/12 bg-white rounded-lg h-[60vh] border-2 p-14 flex flex-col justify-center text-center'>
                <h2 className='font-bold text-3xl'>Lets verify you are human</h2>
                <p>Kindly enter the 4-digit password sent to you to verify your account</p>
                <div className='w-full flex items-center justify-center'>
                <div className='my-2 flex space-x-2 w-6/12 justify-center'>
                {OTP.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleOTPChange(event.target.value, index)}
                    onFocus={() => handleFocus(index)}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    className={`w-1/4 p-3 border-2 ${
                      focusedIndex === index ? 'border-blue-900/90' : 'border-gray-500'
                    } focus:outline-none rounded-lg text-center`}
                  />
                ))}
                 </div>
                 </div>
            </div>
        </section>
      )}
      <Image alt="" src={Section} className="img-fluid hidden md:block" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5">
        <div className="md:ms-32 ms-10 order-last md:order-1">
          <h1 className="text-4xl font-bold tracking-wider">Get Started!</h1>
          <p className="text-lg tracking-wide">
            We Will Help you set up an account in less than a minute
          </p>
          <div className="login-form mt-5">
            <form onSubmit={handleSubmit} className="">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-900 "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-3 placeholder-gray-500 focus:outline-none"
                  placeholder="email@gmail.com"
                  required
                />
              </div>
              <div
                onClick={handleVerifyEmail}
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-lg text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl w-full"
              >
                Create an Account
              </div>
              <p className="mt-3 tracking-wider">
                Already has an Account?{' '}
                <span className="font-bold">
                  <Link href="">Login?</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="order-2 border border-blue-500 rounded-md p-4 w-8/12 bg-blue-200 bg-opacity-20 flex items-center justify-center">
          <Image
            src={login}
            alt=""
            className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5"
          />
        </div>
      </div>
      <footer>
        <p className="text-center text-sm font-mono font-bold my-10 flex items-end justify-center text-gray-500">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
    </div>
  )
}

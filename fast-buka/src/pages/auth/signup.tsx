import React, { useState, useEffect, useRef, Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Section from '../../../public/images/homepage/Section.png'
import login from '../../../public/images/homepage/login.png'
import {sendOTPtoMail, verifyOTP} from '@/lib/api'
import { Eye } from 'lucide-react'

export default function Signup() {
  const [enterMail, setEntermail] = useState<boolean>(true)
  const [email, setEmail] = useState('')
  const [viewVer, setViewVer] = useState<boolean>(false)
  const [OTP, setOTP] = useState<string[]>(Array(4).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [register, setRegister] = useState<boolean>(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')

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
        console.log("email: ", email);
        setViewVer(true)
    }catch(error){
      console.error("failed to verify email: ", error);

    }
    
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const Data = {
      email,
      firstname,
      lastname,
      phone,
      gender,
      password,
    }
    try{
      await fetch('/prisma/Mutation/Registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      })
    }catch(error){
      console.error("failed to submit form: ", error);
    }

    console.log("data: ", email, firstname, lastname, phone, gender, password)
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
      setEntermail(false)
      setViewVer(false)
      setRegister(true)

    } catch (error) {
      console.error('Could not verify OTP:', error);
    }
  };



  


  return (
    <div>
      <div className="bg-[]"></div>
     
      {viewVer && (
        <section className="fixed w-full h-full bg-transparent z-99 flex items-center justify-center">
            <div className='w-full m-2 md:w-5/12 bg-white rounded-lg h-[40vh] md:h-[60vh] border-2 p-14 flex flex-col justify-center text-center'>
                <h2 className='font-bold text-xl md:text-3xl'>Lets verify you are human</h2>
                <p>Kindly enter the 4-digit password sent to you to verify your account</p>
                <div className='w-full flex items-center justify-center'>
                <div className='my-2 flex space-x-2 w-full md:w-6/12 justify-center'>
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
      {enterMail && (
      <div className="container mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 items-center mt-5">
        <div className="md:ms-32 order-last md:order-1">
          <h1 className="text-4xl font-bold tracking-wider">Get Started!</h1>
          <p className="text-lg tracking-wide">
            We Will Help you set up an account in less than a minute
          </p>
          <div className="login-form mt-5">
            <form className="">
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
                  onChange={(event) => setEmail(event.target?.value)}
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
        <div className="order-2 border border-blue-500 rounded-md p-4 ll w-full md:w-8/12 bg-blue-200 bg-opacity-20 flex items-center justify-center">
          <Image
            src={login}
            alt=""
            className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5"
          />
        </div>
      </div>
      )}
      {register && (
        <section className="w-full flex justify-center">
        <div className='w-full md:w-7/12 text-start p-2'>
        <div className="order-2 border border-blue-500 rounded-md p-4 ll w-full md:w-8/12 bg-blue-200 bg-opacity-20 flex items-center justify-center">
          <Image
            src={login}
            alt=""
            className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5"
          />
        </div>
        <h1 className="text-4xl font-bold md:tracking-wider ms-3 mt-5">
          Let's Get to know you!
        </h1>
        <p className="text-lg md:tracking-wide ms-3">
          We'll help you set up an account in less than a minute
        </p>
        <form action="" onSubmit={handleSubmit} className="container mx-auto  px-5 ">
          <div className="grid md:flex flex-col grid-cols-1 gap-x-5 mt-5">
          <div className='md:flex w-full gap-x-4'>
            <div className="mb-5 w-full">
              <label
                htmlFor="firstname"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(event) => setFirstname(event.target?.value)}
                className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-3 placeholder-gray-500"
                placeholder="First Name"
                required
              />
            </div>
            <div className="mb-5 w-full">
              <label
                htmlFor="lastname"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={(event) => setLastname(event.target?.value)}
                className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-3 placeholder-gray-500"
                placeholder="Last name"
                required
              />
            </div>
          </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-lg font-medium text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2 flex gap-x-2">
                <select
                  id="number"
                  name="phone"
                  className="w-3/12 md:w-2/12 bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-3 placeholder-gray-500"
                >
                  <option value="Delta">NG +234</option>
                  <option value="Lagos">GH +233</option>
                </select>
                <input 
                type="number" 
                onChange={(event) => setPhone(event.target?.value)}
                className='w-11/12 bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-3 placeholder-gray-500 focus:outline-none'
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="gender"
                className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                onChange={(event) => setGender(event.target?.value)}
                className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-3 placeholder-gray-500 focus:outline-none"
                required
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 flex justify-between"
              >
                Set new password
              </label>
              <div className="bg-white p-1 flex items-center border border-black text-gray-900 text-sm rounded-lg block w-full placeholder-gray-500 focus:outline-none">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New Password"
                onChange={(event) => setPassword(event.target?.value)}
                className='w-full p-3 focus:outline-none '
                required
              />
              <Eye size={20} className='cursor-pointer'/>
              </div>
            </div>
          </div>
          <p className='my-2'>By creating an account you agree to our Terms of use and Privacy Policy</p>
          <button
            type="submit"
            className="w-full text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-lg text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
          >
            Register
          </button>
        </form>
      </div>
        </section>
      )}
      <footer>
        <p className="text-center text-sm font-mono font-bold my-10 flex items-end justify-center text-gray-500">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
    </div>
  )
}

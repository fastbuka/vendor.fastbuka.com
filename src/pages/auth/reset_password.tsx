import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Section from '../../../public/images/homepage/Section.png'
import login from '../../../public/images/homepage/login.png'
import { sendOTPtoMail, verifyOTP } from '@/lib/api'
import { Eye, Shield } from 'lucide-react'
import toast, {Toaster} from 'react-hot-toast'
export default function Signup() {
  const [enterMail, setEntermail] = useState<boolean>(true)
  const [email, setEmail] = useState('')
  const [viewVer, setViewVer] = useState<boolean>(false)
  const [OTP, setOTP] = useState<string[]>(Array(4).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [register, setRegister] = useState<boolean>(false)
  const [password, setPassword] = useState('')
  const [confPass, setConfPass] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const router = useRouter()

  const handleOTPChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOTP = [...OTP]
      newOTP[index] = value

      setOTP((prevOTP) => {
        const updatedOTP = [...prevOTP]
        updatedOTP[index] = value
        return updatedOTP
      })

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  const handleVerifyEmail = async () => {
    try {
      const response = await sendOTPtoMail(email)
      if(!response.ok){
        console.error("Email not found")
        return toast.error("Invalid mail address")
      }
      console.log('email: ', email)
      setViewVer(true)
    } catch (error) {
      console.error('failed to verify email: ', error)
      toast.error('Failed to send OTP')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if( password != confPass){
      return toast.error('Passwords do not match')
    }

    const Data = {
      email,
      password,
    }
    try {
      const response = await fetch('/api/reset_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      })
      if (response.ok) {
        const result = await response.json()
        router.push('/login')
      } else {
        const error = await response.json()
        console.error('Registration error:', error)
      }
    } catch (error) {
      console.error('failed to submit form: ', error)
    }

    console.log('data: ', email, password)
  }

  

  const handleSubmitOTP = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault()

    const fullOTP = OTP.join('')
    console.log('full OTP: ', fullOTP)
    try {
      const response = await verifyOTP(fullOTP, email)

      if (!response.ok) {
        throw new Error('OTP verification failed')
      }
      setEntermail(false)
      setViewVer(false)
      setRegister(true)
    } catch (error) {
      console.error('Could not verify OTP:', error)
    }
  }

  useEffect(() => {
    const fullOTP = OTP.join('')
    if (fullOTP.length === 4 && OTP.every((digit) => digit !== '')) {
      handleSubmitOTP()
    }
  }, [OTP, handleSubmitOTP])

  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }



  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  return (
    <div>
      <div className="bg-[]"></div>

      {viewVer && (
        <section className="fixed w-full h-full bg-transparent z-99 flex items-center justify-center">
          <div className="w-full m-2 md:w-4/12 bg-white rounded-lg h-[40vh] md:h-[40vh] border-2 p-10 flex flex-col justify-center text-center">
          <div className='w-full flex justify-center py-4'>
            <Shield size={50} className=' ' />
          </div>
            <h2 className="font-bold text-xl md:text-3xl">OTP</h2>
            <p>
              Kindly enter the 4-digit password sent to you to verify your
              account
            </p>
            <div className="w-full flex items-center justify-center">
              <div className="my-2 flex space-x-2 w-full md:w-6/12 justify-center">
                {OTP.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(event) =>
                      handleOTPChange(event.target.value, index)
                    }
                    onFocus={() => handleFocus(index)}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    className={`w-1/4 p-3 border-2 ${
                      focusedIndex === index
                        ? 'border-blue-900/90'
                        : 'border-gray-500'
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
              Enter account email address to reset password
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
                    className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                    placeholder="email@gmail.com"
                    required
                  />
                </div>
                <div
                  onClick={handleVerifyEmail}
                  className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl w-fit"
                >
                  Send OTP
                </div>
              </form>
            </div>
          </div>
          <div className="order-2 ">
            <Image
              src={login}
              alt=""
              className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5"
            />
          </div>
        </div>
      )}
      {register && (
        <div className="container mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 items-center mt-5">
          <div className="md:ms-32 order-last md:order-1">
            <h1 className="text-4xl font-bold tracking-wider">
              Reset Password!
            </h1>
            <p className="text-lg tracking-wide">
              Enter a new password for your account
            </p>
            <div className="login-form mt-5">
              <form className="" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-medium text-gray-900 "
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(event) => setPassword(event.target?.value)}
                    className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                    placeholder="Set new password"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-medium text-gray-900 "
                  >
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    id="conf password"
                    onChange={(event) => setConfPass(event.target?.value)}
                    className="bg-white border border-black text-gray-900 text-sm rounded-full block w-full p-3 placeholder-gray-500"
                    placeholder="confirm new password"
                    required
                  />
                </div>
                <button
                  type='submit'
                  className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl w-fit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="order-2 ">
            <Image
              src={login}
              alt=""
              className="img-fluid p-5 transition ease-in-out delay-150 hover:-translate-y-5"
            />
          </div>
        </div>
      )}
      <footer>
        <p className="text-center text-sm font-mono font-bold my-10 flex items-end justify-center text-gray-500">
          FastBuka @ 2024 All Right Reserved
        </p>
      </footer>
      <Toaster />
    </div>
  )
}

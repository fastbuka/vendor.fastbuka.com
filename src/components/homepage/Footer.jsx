import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div className="bg-black text-white">
        <div className="grid md:grid-cols-6 grid-cols-1 container md:mx-5 px-4 py-20">
          <div className="md:col-span-2 mb-10 md:mb-0">
            <h1 className="font-bold md:text-4xl text-3xl tracking-wider">
              FastBuka
            </h1>
            <p className="mt-1">
              Phone:+234 7026 000 076 <br />
              Email: info@fastbuka.com
            </p>
            <div className="social-media flex items-center justify-start gap-2 flex-wrap my-4">
              <Link
                href="#"
                className="p-2 rounded-full bg-[#2b2b2b] flex w-auto hover:bg-[#0a3a6b] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 71 72"
                  fill="none"
                >
                  <path
                    d="M46.4233 38.6403L47.7279 30.3588H39.6917V24.9759C39.6917 22.7114 40.8137 20.4987 44.4013 20.4987H48.1063V13.4465C45.9486 13.1028 43.7685 12.9168 41.5834 12.8901C34.9692 12.8901 30.651 16.8626 30.651 24.0442V30.3588H23.3193V38.6403H30.651V58.671H39.6917V38.6403H46.4233Z"
                    fill="#ffffff"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-[#2b2b2b] flex w-auto hover:bg-[#0a3a6b] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <path
                    d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
                    fill="#ffffff"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-[#2b2b2b] flex w-auto hover:bg-[#0a3a6b] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 71 72"
                  fill="none"
                >
                  <path
                    d="M12.5068 56.8405L15.7915 44.6381C13.1425 39.8847 12.3009 34.3378 13.4211 29.0154C14.5413 23.693 17.5482 18.952 21.89 15.6624C26.2319 12.3729 31.6173 10.7554 37.0583 11.1068C42.4992 11.4582 47.6306 13.755 51.5108 17.5756C55.3911 21.3962 57.7599 26.4844 58.1826 31.9065C58.6053 37.3286 57.0535 42.7208 53.812 47.0938C50.5705 51.4668 45.8568 54.5271 40.5357 55.7133C35.2146 56.8994 29.6432 56.1318 24.8438 53.5513L12.5068 56.8405ZM25.4386 48.985L26.2016 49.4365C29.6779 51.4918 33.7382 52.3423 37.7498 51.8555C41.7613 51.3687 45.4987 49.5719 48.3796 46.7452C51.2605 43.9185 53.123 40.2206 53.6769 36.2279C54.2308 32.2351 53.445 28.1717 51.4419 24.6709C49.4388 21.1701 46.331 18.4285 42.6027 16.8734C38.8745 15.3184 34.7352 15.0372 30.8299 16.0736C26.9247 17.11 23.4729 19.4059 21.0124 22.6035C18.5519 25.801 17.2209 29.7206 17.2269 33.7514C17.2237 37.0937 18.1503 40.3712 19.9038 43.2192L20.3823 44.0061L18.546 50.8167L25.4386 48.985Z"
                    fill="#ffffff"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M43.9566 36.8847C43.5093 36.5249 42.9856 36.2716 42.4254 36.1442C41.8651 36.0168 41.2831 36.0186 40.7236 36.1495C39.8831 36.4977 39.3399 37.8134 38.7968 38.4713C38.6823 38.629 38.514 38.7396 38.3235 38.7823C38.133 38.8251 37.9335 38.797 37.7623 38.7034C34.6849 37.5012 32.1055 35.2965 30.4429 32.4475C30.3011 32.2697 30.2339 32.044 30.2557 31.8178C30.2774 31.5916 30.3862 31.3827 30.5593 31.235C31.165 30.6368 31.6098 29.8959 31.8524 29.0809C31.9063 28.1818 31.6998 27.2863 31.2576 26.5011C30.9157 25.4002 30.265 24.42 29.3825 23.6762C28.9273 23.472 28.4225 23.4036 27.9292 23.4791C27.4359 23.5546 26.975 23.7709 26.6021 24.1019C25.9548 24.6589 25.4411 25.3537 25.0987 26.135C24.7562 26.9163 24.5939 27.7643 24.6236 28.6165C24.6256 29.0951 24.6864 29.5716 24.8046 30.0354C25.1049 31.1497 25.5667 32.2144 26.1754 33.1956C26.6145 33.9473 27.0937 34.6749 27.6108 35.3755C29.2914 37.6767 31.4038 39.6305 33.831 41.1284C35.049 41.8897 36.3507 42.5086 37.7105 42.973C39.1231 43.6117 40.6827 43.8568 42.2237 43.6824C43.1018 43.5499 43.9337 43.2041 44.6462 42.6755C45.3588 42.1469 45.9302 41.4518 46.3102 40.6512C46.5334 40.1675 46.6012 39.6269 46.5042 39.1033C46.2714 38.0327 44.836 37.4007 43.9566 36.8847Z"
                    fill="#ffffff"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-[#2b2b2b] flex w-auto hover:bg-[#0a3a6b] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <path
                    d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z"
                    fill="#ffffff"
                  />
                </svg>
              </Link>
            </div>
            <p className="mt-3">
              © Copyright <span className="font-bold">FastBuka.</span> All Right
              Reserved
            </p>
          </div>
          <div className="mb-5 md:mb-0">
            <h1 className="text-lg font-bold my-2">Company</h1>
            <ul className="list-none text-[#a1a1a1] leading-10 font-mono">
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Home </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Our Menu </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Vendors </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Riders </Link>
              </li>
            </ul>
          </div>

          <div className="mb-5 md:mb-0">
            <h1 className="text-lg font-bold my-2">Useful</h1>
            <ul className="list-none text-[#a1a1a1] leading-10 font-mono ">
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Blog </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> About us </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Contact </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> FAQs </Link>
              </li>
            </ul>
          </div>

          <div className="mb-5 md:mb-0">
            <h1 className="text-lg font-bold my-2">External</h1>
            <ul className="list-none text-[#a1a1a1] leading-10 font-mono ">
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Become a Vednor </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Become a Rider </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Work with us </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Partnership </Link>
              </li>
            </ul>
          </div>

          <div className="mb-5 md:mb-0">
            <h1 className="text-lg font-bold my-2">Privacy Policy</h1>
            <ul className="list-none text-[#a1a1a1] leading-10 font-mono ">
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Privacy Policy </Link>
              </li>
              <li className="hover:text-white hover:text-xl">
                <Link href=""> Term of use </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

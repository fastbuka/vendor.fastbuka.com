// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
import food_1 from "../../../public/food_1.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MySwiper() {
  return (
    <div className="mt-16">
      <h1
        className="
      text-[#0a3a6b] font-black md:text-4xl text-center text-4xl md:tracking-wider md:ms-32"
      >
        Nutritious Delights for <br />
        Every Craving
      </h1>
      <p className="text-center font-mono mt-3">
        Savor wholesome meals bursting with flavor. Our menu offer nutritious
        options crafted <br />
        with fresh, quality ingredients to nourish your body and tantalize your
        taste buds.
      </p>
      <Swiper
        // Install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        breakpoints={{
          // when window width is >= 640px
          767: {
            slidesPerView: 1, // 1 slide per view on small screens
          },
          // when window width is >= 1024px
          768: {
            slidesPerView: 3, // 3 slides per view on larger screens
          },
        }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="container mt-10 px-20"
      >
        <SwiperSlide>
          <div className="md:px-1 px-10">
            <div className="flex justify-center items-center bg-blue-100 rounded-3xl w-auto">
              <Image className="img-fluid p-5 object-center" src={food_1} alt="food_1"  />
            </div>
            <div className="flex justify-between mt-3">
              <div className="">Name of Food</div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              neque dolorum unde nesciunt ex adipisci Lorem ipsum dolor sit
              amet.
            </p>
            <div className="flex justify-between items-center mt-3">
              <h1 className="font-bold text-3xl">N8,500</h1>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="md:px-1 px-10">
            <div className="flex justify-center items-center bg-blue-100 rounded-3xl w-auto">
              <Image className="img-fluid p-5 object-center" src={food_1} alt="food_1" />
            </div>
            <div className="flex justify-between mt-3">
              <div className="">Name of Food</div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              neque dolorum unde nesciunt ex adipisci Lorem ipsum dolor sit
              amet.
            </p>
            <div className="flex justify-between items-center mt-3">
              <h1 className="font-bold text-3xl">N8,500</h1>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="md:px-1 px-10">
            <div className="flex justify-center items-center bg-blue-100 rounded-3xl w-auto">
              <Image className="img-fluid p-5 object-center" src={food_1} alt="food_1" />
            </div>
            <div className="flex justify-between mt-3">
              <div className="">Name of Food</div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              neque dolorum unde nesciunt ex adipisci Lorem ipsum dolor sit
              amet.
            </p>
            <div className="flex justify-between items-center mt-3">
              <h1 className="font-bold text-3xl">N8,500</h1>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="md:px-1 px-10">
            <div className="flex justify-center items-center bg-blue-100 rounded-3xl w-auto">
              <Image className="img-fluid p-5 object-center" src={food_1} alt="food_1" />
            </div>
            <div className="flex justify-between mt-3">
              <div className="">Name of Food</div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              neque dolorum unde nesciunt ex adipisci Lorem ipsum dolor sit
              amet.
            </p>
            <div className="flex justify-between items-center mt-3">
              <h1 className="font-bold text-3xl">N8,500</h1>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="md:px-1 px-10">
            <div className="flex justify-center items-center bg-blue-100 rounded-3xl w-auto">
              <Image className="img-fluid p-5 object-center" src={food_1} alt="food_1" />
            </div>
            <div className="flex justify-between mt-3">
              <div className="">Name of Food</div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              neque dolorum unde nesciunt ex adipisci Lorem ipsum dolor sit
              amet.
            </p>
            <div className="flex justify-between items-center mt-3">
              <h1 className="font-bold text-3xl">N8,500</h1>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="md:px-1 px-10">
            <div className="flex justify-center items-center bg-blue-100 rounded-3xl w-auto">
              <Image className="img-fluid p-5 object-center" src={food_1} alt="food_1" />
            </div>
            <div className="flex justify-between mt-3">
              <div className="">Name of Food</div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              neque dolorum unde nesciunt ex adipisci Lorem ipsum dolor sit
              amet.
            </p>
            <div className="flex justify-between items-center mt-3">
              <h1 className="font-bold text-3xl">N8,500</h1>
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-3 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Order Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

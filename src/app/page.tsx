import { useState } from "react";
import Navbar from "@/components/Homepage/Navbar";
import Hero from "@/components/Homepage/Hero";
import Hygienic from "@/components/Homepage/Hygienic";
import Services from "@/components/Homepage/Services";
import Partner from "@/components/Homepage/Partner";
import Sponser from "@/components/Homepage/Sponser";
import Faq from "@/components/Homepage/Faq";
import Footer from "@/components/Homepage/Footer";

const Index = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="z-0">
        <Hero />
        <Hygienic />
        <Services />
        {/* <Slider/> */}
        <Partner />
        <Sponser />
        <Faq />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

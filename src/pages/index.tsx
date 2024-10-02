import { useState } from "react";
import Navbar from "../components/homepage/Navbar";
import Hero from "../components/homepage/Hero";
import Hygienic from "../components/homepage/Hygienic";
import Slider from "../components/homepage/Slider";
import Services from "../components/homepage/Services";
import Partner from "../components/homepage/Partner";
import Sponser from "../components/homepage/Sponser";
import Faq from "../components/homepage/Faq";
import Footer from "../components/homepage/Footer";

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

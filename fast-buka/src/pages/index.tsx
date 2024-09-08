import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <Hero />
    </div>
  );
};

export default Index;

import { useState } from "react";
import Navbar from "../components/Navbar";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar/>
    </div>
  );
};

export default Index;

"use client";
import Turkey from "../../../public/turkey.jpg";
import JellofRice from "../../../public/jollof1.jpg";
import Drinks from "../../../public/drinks.jpg";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";

const FoodCategory = [
  {
    id: 1,
    name: "Rice",
    total: "5",
    imageSrc: JellofRice, 
    alt: "Jellof Rice",
  },
  {
    id: 2,
    name: "Protein (Meat)",
    total: "5",
    imageSrc: Turkey, 
    alt: "Turkey",
  },
  {
    id: 3,
    name: "Drinks",
    total: "30",
    imageSrc: Drinks, 
    alt: "Drinks",
  },
];

const Category: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {FoodCategory.map((food, index) => (
          <CardDataStats key={index} name={food.name} total={"Total Item " + food.total} id={food.id}>
            <Image
              src={food.imageSrc}
              alt={food.alt}
              className="img-fluid rounded-full object-cover h-10 w-30"
              width={40} // Adjust the width as needed
              height={40} // Adjust the height as needed
            />
          </CardDataStats>
        ))}

      </div>

    </>
  );
};

export default Category;

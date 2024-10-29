"use client"
import Homes from "@/components/Dashboard/Home";
import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";



export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        {/* <Breadcrumb pageName="Dashboard" /> */}
        <Homes />
      {/* </DefaultLayout> */}
    </>
  );
}

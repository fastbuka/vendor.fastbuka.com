"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddCategory from "@/components/Dashboard/Add-Category";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
      {/* <CryptoRate /> */}
        <Breadcrumb pageName="Edit Item Category" />
        <AddCategory></AddCategory>
      </DefaultLayout>
    </>
  );
}

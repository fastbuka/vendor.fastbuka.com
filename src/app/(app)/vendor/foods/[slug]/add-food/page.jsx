"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddFood from "@/components/Dashboard/Add-Food";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <CryptoRate /> */}
        <Breadcrumb pageName="Add New Item" />
        <AddFood />
      </DefaultLayout>
    </>
  );
}

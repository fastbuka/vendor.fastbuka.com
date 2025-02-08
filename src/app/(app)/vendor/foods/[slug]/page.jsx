"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllFood from "@/components/Dashboard/All-Food";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <CryptoRate /> */}
        <Breadcrumb pageName="Items " />
        <AllFood />
      </DefaultLayout>
    </>
  );
}

"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Wallet from "@/components/Dashboard/Wallet";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <CryptoRate /> */}
        <Breadcrumb pageName="Wallet" />
        <Wallet></Wallet>
      </DefaultLayout>
    </>
  );
}

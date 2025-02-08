"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Settings from "@/components/Dashboard/Settings";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
      {/* <CryptoRate /> */}
      <Breadcrumb pageName="Settings" />
        <Settings></Settings>
      </DefaultLayout>
    </>
  );
}
